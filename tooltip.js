function showTooltip(message) {
    // 创建提示框元素
    const tooltip = document.createElement('div');
    
    // 设置提示框样式
    tooltip.style.position = 'fixed';
    tooltip.style.top = '10px';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '8px';
    tooltip.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    tooltip.style.zIndex = '10000';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.fontSize = '14px';
    tooltip.style.maxWidth = '90%';
    tooltip.style.overflow = 'hidden';
    tooltip.style.textOverflow = 'ellipsis';
    tooltip.style.textAlign = 'center';  // 中心对齐文本
    
    // 设置提示框的文本内容
    tooltip.innerText = message;
    
    // 将提示框添加到文档中
    document.body.appendChild(tooltip);
    
    // 根据文本长度调整提示框宽度
    const textWidth = tooltip.offsetWidth;
    tooltip.style.width = textWidth + 'px';

    // 自动隐藏提示框
    setTimeout(() => {
        tooltip.remove();
    }, 3000);  // 3秒后自动移除
}
