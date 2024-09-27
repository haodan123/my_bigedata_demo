//把16进制的颜色改成rgba格式
export const hexToRgba = (hex, alpha) => {
  // 检查输入的 hex 是否带有 #
  hex = hex.replace(/^#/, '')

  // 如果 hex 是三位数，转换为六位数
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('')
  }
// console.log(hex);
  // 检查 hex 的长度是否为6位数
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }

  // 将 hex 转换为 R, G, B
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  // 返回 RGBA 格式的颜色
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}