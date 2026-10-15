// Cloudinary Client Service for Reality Mind Clinic (RMC)
// Handles direct client-to-Cloudinary uploads with real-time progress tracking

const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim();
const uploadPreset = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim();

export const isCloudinaryConfigured = Boolean(
  cloudName &&
  uploadPreset &&
  !cloudName.includes('your_cloud_name') &&
  !uploadPreset.includes('your_unsigned_preset')
);

export interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
  duration?: string;
  format?: string;
  thumbnailUrl?: string;
  bytes?: number;
}

export interface UploadProgressCallback {
  (percentage: number): void;
}

export const cloudinaryService = {
  isConfigured: isCloudinaryConfigured,
  cloudName: cloudName || 'Not configured',
  uploadPreset: uploadPreset || 'Not configured',

  /**
   * Upload a video or audio file directly to Cloudinary
   */
  async uploadVideo(
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<CloudinaryUploadResult> {
    if (!isCloudinaryConfigured) {
      // Graceful local development simulation fallback if Cloudinary credentials are not yet entered
      console.warn(
        'Cloudinary credentials not detected in .env. Running simulated upload for preview.'
      );
      return new Promise((resolve) => {
        let percent = 0;
        const interval = setInterval(() => {
          percent += 20;
          if (onProgress) onProgress(Math.min(percent, 100));
          if (percent >= 100) {
            clearInterval(interval);
            const objectUrl = URL.createObjectURL(file);
            resolve({
              secureUrl: objectUrl,
              publicId: `local-sim-${Date.now()}`,
              duration: '10 mins',
              format: file.name.split('.').pop() || 'mp4',
              thumbnailUrl:
                'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
              bytes: file.size
            });
          }
        }, 200);
      });
    }

    return new Promise((resolve, reject) => {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'rmc_clinical_videos');

      // Track real-time upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            const durationSec = Math.round(data.duration || 0);
            const minutes = Math.floor(durationSec / 60);
            const seconds = durationSec % 60;
            const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} mins`;

            // Auto-generate Cloudinary frame thumbnail from the uploaded video (frame at 1 second)
            const videoThumbnail = `https://res.cloudinary.com/${cloudName}/video/upload/so_1,w_800,c_fill/${data.public_id}.jpg`;

            resolve({
              secureUrl: data.secure_url,
              publicId: data.public_id,
              duration: formattedDuration,
              format: data.format,
              thumbnailUrl: videoThumbnail,
              bytes: data.bytes
            });
          } catch (err) {
            reject(new Error('Failed to parse Cloudinary response.'));
          }
        } else {
          try {
            const errData = JSON.parse(xhr.responseText);
            reject(
              new Error(
                errData?.error?.message ||
                  `Cloudinary upload failed with status ${xhr.status}. Check upload preset is Unsigned.`
              )
            );
          } catch {
            reject(new Error(`Cloudinary upload failed with status ${xhr.status}.`));
          }
        }
      };

      xhr.onerror = () => {
        reject(
          new Error('Network error occurred during Cloudinary upload. Please check your internet connection.')
        );
      };

      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  },

  /**
   * Upload an image thumbnail directly to Cloudinary
   */
  async uploadImage(
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<string> {
    if (!isCloudinaryConfigured) {
      return URL.createObjectURL(file);
    }

    return new Promise((resolve, reject) => {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'rmc_thumbnails');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data.secure_url);
          } catch {
            reject(new Error('Failed to parse image response'));
          }
        } else {
          reject(new Error('Image upload failed'));
        }
      };

      xhr.onerror = () => reject(new Error('Image network error'));
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
};
