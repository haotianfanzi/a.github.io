// 主应用类
class CppReferenceApp {
    constructor() {
        this.headersData = null;
        this.currentFunctionDetail = null;
        this.init();
    }

    // 初始化应用
    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    // 设置事件监听器
    setupEventListeners() {
        // 搜索功能
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const searchResults = document.getElementById('search-results');
        const closeDetailBtn = document.getElementById('close-detail');
        
        // 代码分析功能
        const analyzeBtn = document.getElementById('analyze-btn');
        const clearBtn = document.getElementById('clear-btn');
        const codeInput = document.getElementById('code-input');

        // 搜索按钮点击事件
        searchBtn.addEventListener('click', () => this.performSearch());

        // 搜索输入框键盘事件
        searchInput.addEventListener('input', () => this.handleSearchInput());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // 点击外部关闭搜索结果
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box') && !e.target.closest('.search-results')) {
                searchResults.classList.remove('show');
            }
        });

        // 关闭函数详情
        closeDetailBtn.addEventListener('click', () => this.hideFunctionDetail());
        
        // 代码分析事件
        analyzeBtn.addEventListener('click', () => this.analyzeCode());
        clearBtn.addEventListener('click', () => this.clearCode());
        
        // 代码输入框键盘事件
        codeInput.addEventListener('keypress', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.analyzeCode();
            }
        });

        // 初始化页面数据
        this.initData();
    }

    // 初始化数据
    initData() {
        // 检查headersData是否已加载（由data/headers-data.js提供）
        if (typeof headersData !== 'undefined') {
            this.headersData = headersData;
            this.renderHeaders();
        } else {
            console.error('headersData is not defined. Please ensure data/headers-data.js is loaded.');
        }
    }

    // 渲染头文件
    renderHeaders() {
        if (!this.headersData) return;

        // 渲染C头文件
        this.renderHeaderGrid('c-headers-grid', this.headersData.c_headers);
        
        // 渲染C++头文件
        this.renderHeaderGrid('cpp-headers-grid', this.headersData.cpp_headers);
    }

    // 渲染头文件网格
    renderHeaderGrid(containerId, headers) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        headers.forEach(header => {
            const headerCard = this.createHeaderCard(header);
            container.appendChild(headerCard);
        });
    }

    // 创建头文件卡片
    createHeaderCard(header) {
        const card = document.createElement('div');
        card.className = 'header-card';

        card.innerHTML = `
            <h3 class="header-name">${header.name}</h3>
            <p class="header-description">${header.description}</p>
            <div class="functions-list">
                ${header.functions.map(func => `
                    <div class="function-item" data-function="${func.name}" data-header="${header.name}">
                        ${func.name}
                    </div>
                `).join('')}
            </div>
        `;

        // 添加函数点击事件
        const functionItems = card.querySelectorAll('.function-item');
        functionItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const funcName = e.currentTarget.dataset.function;
                const headerName = e.currentTarget.dataset.header;
                this.showFunctionDetail(funcName, headerName);
            });
        });

        return card;
    }

    // 处理搜索输入
    handleSearchInput: debounce(function() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        const query = searchInput.value.trim().toLowerCase();

        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }

        const results = this.searchHeadersAndFunctions(query);
        this.displaySearchResults(results);
    }, 300)

    // 执行搜索
    performSearch() {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim().toLowerCase();

        if (query.length < 2) {
            return;
        }

        const results = this.searchHeadersAndFunctions(query);
        this.displaySearchResults(results);
    }

    // 搜索头文件和函数
    searchHeadersAndFunctions(query) {
        const results = [];
        
        if (!this.headersData) return results;

        // 搜索C头文件
        this.headersData.c_headers.forEach(header => {
            // 搜索头文件名称
            if (header.name.toLowerCase().includes(query)) {
                results.push({
                    type: 'header',
                    category: 'C',
                    name: header.name,
                    description: header.description
                });
            }
            
            // 搜索头文件中的函数
            header.functions.forEach(func => {
                if (func.name.toLowerCase().includes(query)) {
                    results.push({
                        type: 'function',
                        category: 'C',
                        header: header.name,
                        name: func.name,
                        description: func.description || ''
                    });
                }
            });
        });

        // 搜索C++头文件
        this.headersData.cpp_headers.forEach(header => {
            // 搜索头文件名称
            if (header.name.toLowerCase().includes(query)) {
                results.push({
                    type: 'header',
                    category: 'C++',
                    name: header.name,
                    description: header.description
                });
            }
            
            // 搜索头文件中的函数
            header.functions.forEach(func => {
                if (func.name.toLowerCase().includes(query)) {
                    results.push({
                        type: 'function',
                        category: 'C++',
                        header: header.name,
                        name: func.name,
                        description: func.description || ''
                    });
                }
            });
        });

        return results;
    }

    // 显示搜索结果
    displaySearchResults(results) {
        const searchResults = document.getElementById('search-results');
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">未找到匹配结果</div>';
            searchResults.classList.add('show');
            return;
        }

        searchResults.innerHTML = results.map(result => {
            if (result.type === 'header') {
                return `
                    <div class="search-result-item">
                        <div class="result-header">${result.category} 头文件: ${result.name}</div>
                        <div class="result-description">${result.description}</div>
                    </div>
                `;
            } else {
                return `
                    <div class="search-result-item" onclick="app.showFunctionDetail('${result.name}', '${result.header}')">
                        <div class="result-header">${result.category} 函数: ${result.name}</div>
                        <div class="result-function">${result.header}</div>
                        <div class="result-description">${result.description}</div>
                    </div>
                `;
            }
        }).join('');

        searchResults.classList.add('show');
    }

    // 显示函数详情
    showFunctionDetail(funcName, headerName) {
        // 隐藏搜索结果
        document.getElementById('search-results').classList.remove('show');

        // 查找函数详情
        const funcDetail = this.findFunctionDetail(funcName, headerName);
        if (!funcDetail) {
            console.error(`Function ${funcName} not found in header ${headerName}`);
            return;
        }

        this.currentFunctionDetail = funcDetail;
        this.renderFunctionDetail(funcDetail);
    }

    // 查找函数详情
    findFunctionDetail(funcName, headerName) {
        if (!this.headersData) return null;

        // 搜索所有头文件
        const allHeaders = [...this.headersData.c_headers, ...this.headersData.cpp_headers];
        
        for (const header of allHeaders) {
            if (header.name === headerName) {
                const func = header.functions.find(f => f.name === funcName);
                if (func) {
                    return {
                        ...func,
                        header: headerName
                    };
                }
            }
        }
        
        return null;
    }

    // 渲染函数详情
    renderFunctionDetail(funcDetail) {
        const detailSection = document.getElementById('function-detail');
        const detailTitle = document.getElementById('detail-title');
        const detailContent = document.getElementById('detail-content');

        // 更新标题
        detailTitle.textContent = `${funcDetail.name} - ${funcDetail.header}`;

        // 更新内容
        let contentHtml = `
            <div class="function-info">
                <h3>函数签名</h3>
                <pre><code>${funcDetail.signature || funcDetail.name};</code></pre>
            </div>
        `;

        if (funcDetail.description) {
            contentHtml += `
                <div class="function-description">
                    <h3>描述</h3>
                    <p>${funcDetail.description}</p>
                </div>
            `;
        }

        if (funcDetail.parameters) {
            contentHtml += `
                <div class="function-parameters">
                    <h3>参数</h3>
                    <ul>
                        ${funcDetail.parameters.map(param => `
                            <li><strong>${param.name}:</strong> ${param.description}</li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        if (funcDetail.returnValue) {
            contentHtml += `
                <div class="function-return">
                    <h3>返回值</h3>
                    <p>${funcDetail.returnValue}</p>
                </div>
            `;
        }

        if (funcDetail.example) {
            contentHtml += `
                <div class="function-example">
                    <h3>示例</h3>
                    <pre><code>${funcDetail.example}</code></pre>
                </div>
            `;
        }

        detailContent.innerHTML = contentHtml;
        detailSection.classList.add('show');

        // 滚动到详情区域
        detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 隐藏函数详情
    hideFunctionDetail() {
        const detailSection = document.getElementById('function-detail');
        detailSection.classList.remove('show');
        this.currentFunctionDetail = null;
    }
    
    // 代码分析功能
    analyzeCode() {
        const codeInput = document.getElementById('code-input');
        const codeLanguage = document.getElementById('code-language').value;
        const code = codeInput.value;
        
        if (!code.trim()) {
            this.renderAnalysisResults([]);
            return;
        }
        
        // 检测代码错误
        const errors = this.detectErrors(code, codeLanguage);
        
        // 渲染分析结果
        this.renderAnalysisResults(errors);
    }
    
    // 清空代码
    clearCode() {
        const codeInput = document.getElementById('code-input');
        codeInput.value = '';
        
        // 清空结果
        const resultsContainer = document.getElementById('analysis-results');
        resultsContainer.innerHTML = '<p class="placeholder">请输入代码并点击"分析代码"按钮开始分析</p>';
    }
    
    // 检测代码错误
    detectErrors(code, language) {
        const errors = [];
        const lines = code.split('\n');
        
        lines.forEach((line, index) => {
            const lineNumber = index + 1;
            const trimmedLine = line.trim();
            
            // 检测常见错误
            this.checkSyntaxErrors(line, lineNumber, language, errors);
            this.checkCommonMistakes(line, lineNumber, language, errors);
            this.checkStyleIssues(line, lineNumber, language, errors);
        });
        
        return errors;
    }
    
    // 检查语法错误
    checkSyntaxErrors(line, lineNumber, language, errors) {
        const trimmedLine = line.trim();
        
        // 检测缺少分号
        if (trimmedLine && !trimmedLine.endsWith(';') && 
            !trimmedLine.endsWith('{') && !trimmedLine.endsWith('}') && 
            !trimmedLine.endsWith(')') && !trimmedLine.endsWith('(') &&
            !trimmedLine.endsWith(':') && !trimmedLine.startsWith('#') &&
            !trimmedLine.includes('if') && !trimmedLine.includes('for') &&
            !trimmedLine.includes('while') && !trimmedLine.includes('switch') &&
            !trimmedLine.includes('case') && !trimmedLine.includes('default') &&
            !trimmedLine.includes('return') && !trimmedLine.includes('break') &&
            !trimmedLine.includes('continue') && !trimmedLine.includes('goto')) {
            errors.push({
                type: 'error',
                line: lineNumber,
                column: line.length,
                message: '缺少分号',
                description: 'C/C++语言要求语句结束时添加分号',
                solution: '在语句末尾添加分号'
            });
        }
        
        // 检测未匹配的括号
        const openBraces = (line.match(/{/g) || []).length;
        const closeBraces = (line.match(/}/g) || []).length;
        if (openBraces !== closeBraces) {
            errors.push({
                type: 'warning',
                line: lineNumber,
                column: 0,
                message: '括号不匹配',
                description: '该行包含未匹配的大括号',
                solution: '检查并确保所有大括号都正确匹配'
            });
        }
        
        // 检测未声明的main函数返回类型（C语言）
        if (language === 'c' && trimmedLine.startsWith('main(') && !trimmedLine.startsWith('int main')) {
            errors.push({
                type: 'error',
                line: lineNumber,
                column: 0,
                message: 'main函数缺少返回类型',
                description: 'C语言要求main函数返回int类型',
                solution: '将main函数声明为int main()'
            });
        }
        
        // 检测C++中使用cout/cin但未包含<iostream>头文件（简单检测）
        if (language === 'cpp' && (trimmedLine.includes('cout') || trimmedLine.includes('cin'))) {
            errors.push({
                type: 'warning',
                line: lineNumber,
                column: 0,
                message: '可能缺少头文件',
                description: '使用cout/cin时应包含<iostream>头文件',
                solution: '在文件开头添加#include <iostream>'
            });
        }
    }
    
    // 检查常见错误
    checkCommonMistakes(line, lineNumber, language, errors) {
        const trimmedLine = line.trim();
        
        // 检测使用未初始化的变量（简单检测）
        if (trimmedLine.includes('=')) {
            const parts = trimmedLine.split('=');
            if (parts[0].includes('int ') || parts[0].includes('float ') || 
                parts[0].includes('double ') || parts[0].includes('char ')) {
                // 检测变量声明但未初始化
                const varName = parts[0].trim().split(' ').pop();
                if (varName && !varName.endsWith(';') && parts[1].trim() === '') {
                    errors.push({
                        type: 'warning',
                        line: lineNumber,
                        column: 0,
                        message: '变量声明但未初始化',
                        description: '变量声明后应立即初始化，避免使用未初始化的值',
                        solution: '在声明变量时初始化，如：int x = 0;'
                    });
                }
            }
        }
        
        // 检测printf缺少格式字符串（简单检测）
        if (trimmedLine.includes('printf(') && !trimmedLine.includes('"')) {
            errors.push({
                type: 'error',
                line: lineNumber,
                column: 0,
                message: 'printf缺少格式字符串',
                description: 'printf函数第一个参数必须是格式字符串',
                solution: '为printf添加格式字符串，如：printf("%d\n", x);'
            });
        }
        
        // 检测scanf缺少&符号（简单检测）
        if (trimmedLine.includes('scanf(') && trimmedLine.includes('%') && !trimmedLine.includes('&')) {
            errors.push({
                type: 'warning',
                line: lineNumber,
                column: 0,
                message: 'scanf可能缺少取地址符',
                description: 'scanf函数读取基本类型时需要使用取地址符&',
                solution: '在变量前添加&符号，如：scanf("%d", &x);'
            });
        }
        
        // 检测字符串比较使用==
        if (trimmedLine.includes('==') && (trimmedLine.includes('"') || trimmedLine.includes('char'))) {
            errors.push({
                type: 'error',
                line: lineNumber,
                column: 0,
                message: '字符串比较错误',
                description: 'C/C++中不能直接使用==比较字符串，应使用strcmp函数',
                solution: '使用strcmp函数比较字符串，如：if (strcmp(str1, str2) == 0)'
            });
        }
    }
    
    // 检查风格问题
    checkStyleIssues(line, lineNumber, language, errors) {
        const trimmedLine = line.trim();
        
        // 检测行长度过长
        if (line.length > 100) {
            errors.push({
                type: 'warning',
                line: lineNumber,
                column: 100,
                message: '行长度过长',
                description: '建议每行不超过100个字符，提高代码可读性',
                solution: '将长行拆分为多行'
            });
        }
        
        // 检测缺少空格
        if (trimmedLine.includes('if(') || trimmedLine.includes('for(') || 
            trimmedLine.includes('while(') || trimmedLine.includes('switch(')) {
            errors.push({
                type: 'info',
                line: lineNumber,
                column: 0,
                message: '缺少空格',
                description: '关键字和括号之间应添加空格，提高代码可读性',
                solution: '在关键字和括号之间添加空格，如：if (condition)'
            });
        }
        
        // 检测多余的空格
        if (trimmedLine.includes('  ')) {
            errors.push({
                type: 'info',
                line: lineNumber,
                column: 0,
                message: '多余的空格',
                description: '代码中不应包含连续的空格，提高代码整洁度',
                solution: '使用单个空格分隔标识符'
            });
        }
    }
    
    // 渲染分析结果
    renderAnalysisResults(errors) {
        const resultsContainer = document.getElementById('analysis-results');
        
        if (errors.length === 0) {
            resultsContainer.innerHTML = '<div class="no-errors">未检测到明显错误！</div>';
            return;
        }
        
        const errorElements = errors.map(error => {
            const errorType = error.type;
            const elementClass = `${errorType}-item`;
            const headerClass = `${errorType}-header`;
            const descriptionClass = `${errorType}-description`;
            const solutionClass = `${errorType}-solution`;
            
            const typeText = {
                'error': '错误',
                'warning': '警告',
                'info': '提示'
            }[errorType];
            
            return `
                <div class="${elementClass}">
                    <div class="${headerClass}">
                        <span class="line-number">第${error.line}行</span>
                        ${typeText}: ${error.message}
                    </div>
                    <div class="${descriptionClass}">${error.description}</div>
                    <div class="${solutionClass}">解决方案: ${error.solution}</div>
                </div>
            `;
        });
        
        resultsContainer.innerHTML = errorElements.join('');
    }
}

// 初始化应用
const app = new CppReferenceApp();

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 平滑滚动
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 监听导航链接点击
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        smoothScrollTo(targetId);
    }
});

// 页面加载完成后执行
window.addEventListener('load', () => {
    // 添加页面加载动画
    document.body.classList.add('loaded');
});

// 导出应用实例（供外部使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CppReferenceApp;
}