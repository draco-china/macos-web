import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'ipad' | 'pc';
export default function useDeviceType() {
  const [type, setType] = useState<DeviceType>('pc');

  useEffect(() => {
    let deviceType: DeviceType = 'pc';
    const ua = navigator.userAgent.toLowerCase();
    if (/mobile|iphone|ipad|ipod|android|blackberry|windows phone/.test(ua)) {
      if (/ipad/.test(ua)) {
        deviceType = 'ipad';
      } else {
        deviceType = 'mobile';
      }
    }
    setType(deviceType);
  }, []);

  return type;
}
