/**
 * ฟังก์ชันสำหรับตัด Field ที่ไม่มีข้อมูลก่อนส่ง API
 */
export function removeEmptyFields<T extends Record<string, any>>(
  payload: T
): Partial<T> {
  return Object.keys(payload).reduce((acc, key) => {
    const value = payload[key];
    
    // เงื่อนไข: กรอง String ว่าง, null และ undefined ออก
    if (value !== "" && value !== null && value !== undefined) {
      acc[key as keyof T] = value;
    }
    
    return acc;
  }, {} as Partial<T>);
}