
import * as b from './bar.js'
window.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    let cmEditor = CodeMirror.fromTextArea(editor, {
        theme: "default",
        configureMouse: function(cm, repeat, ev){
            return { addNew: false };
        },
        pollInterval: 1000,
        lineWrapping: true,
        autoRefresh: true,
    });
    db.foo().then(function(result){
        let editorValue = "Environment: " + env.nodeEnv() + "\n"
        editorValue += JSON.stringify(result) + "\n"
        cmEditor.setValue(editorValue);
    })
    document.getElementById('h2').textContent = b.bar()
    console.log(cmEditor);
});