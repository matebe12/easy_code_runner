var editor;
var timer;
window.onload = function () {
    require.config({
        paths: {
            vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.16.2/min/vs',
        },
    });
    require(['vs/editor/editor.main'], function () {
        editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'hc-black',
            fontFamily: 'Nanum Gothic Coding',
            automaticLayout: true,
            language: 'javascript',
            value: !getScript()
                ? ['//현재 언어설정은 javascript입니다.'].join('\n')
                : getScript(),
        });
        editor.onKeyUp(function (e) {
            //debounce
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                var autoRun = document.getElementById('auto').checked;
                if (autoRun) runScript();
            }, 1000);
        });
    });
};
function runScript() {
    //alert(document.getElementById('code').value);
    axios
        .post('http://localhost:3000/test', {
            code: editor.getValue(),
        })
        .then(function (result) {
            results = result.data.success.split('\n');

            if (result.data.success) {
                results.map(function (e, i) {
                    if (i != results.length - 1) {
                        success = `<li class="success">
                                            <span class="gutter"></span>
                                            <div><span class="str">[output]\t${e}</span></div>
                                        </li>`;
                        document.getElementById('output').innerHTML += success;
                    }
                });
            }

            if (result.data.fail) {
                fail = `<li class="fail">
                                    <span class="gutter"></span>
                                    <div><span class="str">[error]\n${result.data.fail}</span></div>
                                </li>`;
                document.getElementById('output').innerHTML += fail;
            }
            var content = document.getElementById('result');
            content.scrollTop = content.scrollHeight;
            saveScript();
        })
        .catch(function (e) {
            console.log(result.data.error);
        });
}
function saveScript() {
    localStorage.setItem('javascript', editor.getValue());
}

function getScript() {
    return localStorage.getItem('javascript');
}
function removeScript(e) {
    document.getElementById('output').innerHTML = '';
}
