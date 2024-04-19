// ==UserScript==
// @name         OM优化
// @icon         https://
// @namespace    https://
// @supportURL   https://
// @version      2024.4.11
// @license      MIT
// @description  支持手机端和PC端，屏蔽广告，优化浏览体验，自动跳转拦截的URL
// @author       Mr.Q
// @match        *://*.brightdairy.com*/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_info
// @grant        unsafeWindow
// @run-at       document-start
// @require      https://update.greasyfork.org/scripts/462234/1322684/Message.js
// @require      https://update.greasyfork.org/scripts/456485/1357649/pops.js
// @require      https://update.greasyfork.org/scripts/455186/1355010/WhiteSevsUtils.js
// @require      https://update.greasyfork.org/scripts/465772/1344519/DOMUtils.js
// ==/UserScript==

(function () {
    if (typeof unsafeWindow === "undefined") {
      unsafeWindow = globalThis || window;
    }
    /**
     * @type {import("../库/pops")}
     */
    const pops = window.pops;
    /**
     * @type {import("../库/Utils")}
     */
    const utils = window.Utils.noConflict();
    /**
     * @type {import("../库/DOMUtils")}
     */
    const DOMUtils = window.DOMUtils.noConflict();
    /**
     * @type {import("../库/Qmsg")}
     */
    const Qmsg = window.Qmsg;
  
    const log = new utils.Log(GM_info, unsafeWindow.console || console);
    log.config({
      autoClearConsole: false,
    });
  
    const GM_addStyle = utils.addStyle;
  
    /**
     * 油猴菜单
     */
    const GM_Menu = new utils.GM_Menu({
      GM_getValue,
      GM_setValue,
      GM_registerMenuCommand,
      GM_unregisterMenuCommand,
    });
  
    /* 配置吐司Qmsg */
    Qmsg.config({
      position: "top",
      html: true,
      maxNums: 5,
      autoClose: true,
      showClose: false,
      showReverse: true,
    });
  
    /**
     * 移除元素（未出现也可以等待出现）
     * @param {string} selectorText 元素选择器
     */
    const waitForElementToRemove = function (selectorText = "") {
      utils.waitNodeList(selectorText).then((nodeList) => {
        nodeList.forEach((item) => {
          item.remove();
        });
      });
    };


const OMfunction = {
    async LinkRotName() {
        console.log('开始同步线路起止名称...');
        const maxAttempts = 3;
        let attempts = 0;
        const iframe = document.querySelector('iframe[name="view"]');
        const startRotNameInput = iframe && iframe.contentWindow.document.querySelector('input[name="startRotName"]');
        const endRotNameInput = iframe && iframe.contentWindow.document.querySelector('input[name="endRotName"]');
    
        if (iframe && startRotNameInput && endRotNameInput && !startRotNameInput.classList.contains('eventListenerAdded')) {
            // console.log(startRotNameInput,endRotNameInput)
            startRotNameInput.nextSibling.addEventListener('focus', function () {
                //this.value = startRotNameInput.value;
                //endRotNameInput.value = this.value;
                endRotNameInput.nextSibling.value = this.value;
                var component = iframe.contentWindow.Ext.getCmp(endRotNameInput.nextSibling.id);
                // 调用组件的 assertValue 方法
                if (component && component.assertValue) {
                    component.assertValue();
                }
            });
            startRotNameInput.classList.add('eventListenerAdded');
    
            Qmsg.success(`已修改为线路起止同步!`);
            console.log('已修改为线路起止同步。');
        } else {
            attempts++;
            if (attempts < maxAttempts) {
                setTimeout(SyncRotName, 1000);
            } else {
                console.log('无法找到iframe或文本框。尝试次数已达到上限。');
            }
        }
    }

    }
    OMfunction.LinkRotName();

  })();