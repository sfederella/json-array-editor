(window["webpackJsonprecipes-depurator"]=window["webpackJsonprecipes-depurator"]||[]).push([[0],{45:function(e,t,n){e.exports=n(62)},50:function(e,t,n){},51:function(e,t,n){},62:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(7),s=n.n(o),c=(n(50),n(24)),i=n(16),u=n(35),l=n(36),d=n(42),p=(n(51),n(37)),h=(n(55),n(38)),f=n.n(h),m=(n(56),n(58),n(96)),v=n(101),x=n(41),I=n(102),y=n(94),g=n(21),j=n.n(g),E=n(29),w={putJsonArrayAt:function(e,t,n){fetch("/api/jsonarray/"+t,{method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8"}}).then(function(){var e=Object(E.a)(j.a.mark(function e(t){var r;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:r=e.sent,n(r);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())},getJsonArrayAt:function(e,t){fetch("/api/jsonarray/"+e).then(function(){var e=Object(E.a)(j.a.mark(function e(n){var r;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.json();case 2:r=e.sent,t(r);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())},getSize:function(e){fetch("/api/size").then(function(){var t=Object(E.a)(j.a.mark(function t(n){var r;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.json();case 2:r=t.sent,e(r);case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}())}},O=n(98),S=n(99),b=n(100);y.a.contrastText="#fff";var k=Object(x.a)({palette:{primary:y.a}}),A=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).setEditorRef=function(t){return e.editor=t},e.handleOnNext=function(){w.putJsonArrayAt(e.state.json,e.state.currentIndex-1,function(t){if(t.success){var n=e.state.currentIndex+1;localStorage.setItem("currentIndex",n),e.setState({currentIndex:n})}else alert("Error: "+t.error)})},e.handleOnPrev=function(){w.putJsonArrayAt(e.state.json,e.state.currentIndex-1,function(t){if(t.success){var n=e.state.currentIndex-1;localStorage.setItem("currentIndex",n),e.setState({currentIndex:n})}else alert("Error: "+t.error)})},e.handleKeyPress=function(t){"Enter"===t.key&&e.setState({currentIndex:parseInt(t.target.value)})},e.state={size:0,currentIndex:0,inputIndex:0,json:{}},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;w.getSize(function(t){if(t.size>=1){var n=parseInt(localStorage.getItem("currentIndex"));(!n||n>t.size)&&(n=1),e.setState({size:t.size,currentIndex:n,inputIndex:n})}else alert("The json array must have al least one element.")})}},{key:"componentDidUpdate",value:function(e,t){var n=this;this.state.currentIndex!==t.currentIndex&&w.getJsonArrayAt(this.state.currentIndex-1,function(e){e.error?alert("Error: "+e.error):(n.setState({json:e,inputIndex:n.state.currentIndex}),n.editor.jsonEditor.set(e))})}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement(I.a,{theme:k},a.a.createElement(m.a,{container:!0,direction:"row",justify:"center",alignItems:"center",spacing:1},a.a.createElement(m.a,{item:!0},a.a.createElement(O.a,{className:"pageIndex"},a.a.createElement(S.a,{variant:"h5",component:"h2"},a.a.createElement(b.a,{id:"currentIndexInput",value:this.state.inputIndex,onChange:function(t){return e.setState({inputIndex:t.target.value})},onBlur:function(t){return e.setState({currentIndex:parseInt(t.target.value)})},onKeyPress:this.handleKeyPress,type:"text",margin:"normal",variant:"outlined"})," / ",this.state.size)))),a.a.createElement(p.a,{ref:this.setEditorRef,value:this.state.json,onChange:function(t){return e.setState({json:t})},ace:f.a,mode:"code",theme:"ace/theme/github"}),a.a.createElement(m.a,{container:!0,direction:"row",justify:"center",alignItems:"center",spacing:2},this.state.currentIndex>1&&a.a.createElement(m.a,{item:!0},a.a.createElement(v.a,{variant:"contained",color:"secondary",size:"large",onClick:this.handleOnPrev},"Previous")),a.a.createElement(m.a,{item:!0},a.a.createElement(v.a,{variant:"contained",color:"primary",size:"large",onClick:this.handleOnNext},"Next"))))))}}]),t}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[45,1,2]]]);