
// 改写的Clipboard.js代码(更快更简洁更小)
class ClipboardAction {
    /**
     * @param {Object} options
     */
    constructor(options) {
        this.resolveOptions(options);
        this.initSelection();
    }

    resolveOptions(options = {}) {
        this.target    = options.target;
        this.text      = options.text;
    }

    // 初始化选择
    initSelection() {
        // 如果有文字
        if (this.text) {
            this.selectFake();
        } else if (this.target) {
            // 如果是元素
            this.selectTarget();
        }
    }

    selectFake() {
        const isRTL = document.documentElement.getAttribute('dir') == 'rtl';

        this.removeFake();

        this.fakeElem = document.createElement('textarea');
        // Prevent zooming on iOS
        this.fakeElem.style.fontSize = '12pt';
        // Reset box model
        this.fakeElem.style.border = '0';
        this.fakeElem.style.padding = '0';
        this.fakeElem.style.margin = '0';
        // Move element out of screen horizontally
        this.fakeElem.style.position = 'absolute';
        this.fakeElem.style[ isRTL ? 'right' : 'left' ] = '-9999px';
        // Move element to the same position vertically
        let yPosition = window.pageYOffset || document.documentElement.scrollTop;
        this.fakeElem.style.top = `${yPosition}px`;

        this.fakeElem.setAttribute('readonly', '');
        this.fakeElem.value = this.text;
        
        document.body.appendChild(this.fakeElem);
        this.fakeElem.select();
        this.fakeElem.setSelectionRange(0, this.fakeElem.value.length);

        this.copyText();
    }

    selectTarget() {
        this.copyText();
    }

    removeFake() {
        if (this.fakeElem) {
            document.body.removeChild(this.fakeElem);
            this.fakeElem = null;
        }
    }

    copyText() {
        let succeeded;

        try {
            succeeded = document.execCommand('Copy');
        }
        catch (err) {
            succeeded = false;
        }
    }
}

export default ClipboardAction;
