import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  X,
  CheckCircle2,
  Phone,
  User,
  Mail,
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClinicService, TreatmentArea } from '../types';
import confetti from 'canvas-confetti';

export const BookingModal: React.FC = () => {
  const { bookingModalOpen, setBookingModalOpen, bookAppointment, currentUser } = useApp();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [appointmentType, setAppointmentType] = useState<'offline' | 'online'>('offline');
  const [service, setService] = useState<ClinicService>('Psychotherapy');
  const [treatmentArea, setTreatmentArea] = useState<TreatmentArea>('Anxiety');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 11:45 AM');
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [notes, setNotes] = useState('');
  const [bookedDetails, setBookedDetails] = useState<any>(null);

  if (!bookingModalOpen) return null;

  const timeSlots = [
    '10:15 AM - 11:00 AM',
    '11:00 AM - 11:45 AM',
    '12:00 PM - 12:45 PM',
    '02:30 PM - 03:15 PM',
    '03:30 PM - 04:15 PM',
    '05:00 PM - 05:45 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    const created = bookAppointment({
      patientId: currentUser?.id || `pat-${Date.now()}`,
      patientName: name,
      patientPhone: phone,
      patientEmail: email || 'patient@realitymind.com',
      service,
      treatmentArea,
      type: appointmentType,
      date,
      timeSlot,
      notes
    });

    setBookedDetails(created);
    setStep('success');

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleClose = () => {
    setBookingModalOpen(false);
    setStep('form');
    setBookedDetails(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-neutral-300 w-full max-w-xl rounded-lg shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center text-neutral-900">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-garamond text-xl font-bold text-neutral-950">
                Book Psychological Consultation
              </h3>
              <p className="text-[11px] text-neutral-500 font-sans">
                Reality Mind Clinic · Tak Mohalla Road, Bijbehara & Online Telehealth
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="text-neutral-400 hover:text-black transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {step === 'success' && bookedDetails ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-neutral-950 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="font-garamond text-2xl font-bold text-neutral-900">
                  Consultation Confirmed
                </h4>
                <p className="text-xs text-neutral-600 mt-1 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-neutral-950">{bookedDetails.patientName}</span>. Your appointment has been recorded with the Psychologist.
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-neutral-200 pb-1.5 font-mono">
                  <span className="text-neutral-500">Appointment ID:</span>
                  <span className="font-bold text-neutral-900">{bookedDetails.id}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                  <span className="text-neutral-500">Format:</span>
                  <span className="font-semibold text-neutral-900">
                    {bookedDetails.type === 'offline' ? 'In-Clinic (Tak Mohalla Rd, Bijbehara)' : 'Online Video Consultation'}
                  </span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-neutral-500">Schedule:</span>
                  <span className="font-bold text-neutral-900">{bookedDetails.date} at {bookedDetails.timeSlot}</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-100/70 border border-neutral-200 rounded text-xs text-neutral-600 text-left flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <span>
                  After this session, your Psychologist will issue your personalized PIN to unlock targeted private intervention videos in the platform library.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/916005754205?text=Hello%20Reality%20Mind%20Clinic,%20I%20have%20booked%20appointment%20${bookedDetails.id}%20for%20${bookedDetails.patientName}%20on%20${bookedDetails.date}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-neutral-900 text-white py-2.5 rounded font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 text-center transition-colors"
                >
                  Send Confirmation to WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="border border-neutral-300 py-2.5 px-4 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-50"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  1. Consultation Setting
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAppointmentType('offline')}
                    className={`p-3 rounded border text-left flex items-start gap-2.5 transition-all ${
                      appointmentType === 'offline'
                        ? 'border-black bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs">In-Clinic Consultation</div>
                      <div className={`text-[10px] ${appointmentType === 'offline' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        Tak Mohalla Road, Bijbehara
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAppointmentType('online')}
                    className={`p-3 rounded border text-left flex items-start gap-2.5 transition-all ${
                      appointmentType === 'online'
                        ? 'border-black bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <Video className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs">Online Tele-Consultation</div>
                      <div className={`text-[10px] ${appointmentType === 'online' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        Secure Video / Audio Call
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    2. Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    3. Available Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden bg-white"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                  4. Patient Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. 6005754205) *"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address (for appointment confirmation)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Brief notes or symptoms you would like the psychologist to know..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded font-semibold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Confirm Appointment Booking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 px-6 py-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 shrink-0">
          <span>Need immediate assistance? Call 6005754205</span>
          <span>Confidential Clinical Practice</span>
        </div>
      </div>
    </div>
  );
};
