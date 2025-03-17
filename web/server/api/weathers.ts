import { EGG_SERVER } from "@/constants";

export default defineEventHandler(async (event) => {
  try {
    const response = await fetch(`${EGG_SERVER}/v0.1/weathers`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("获取天气数据失败:", error);
    return [];
  }
});
