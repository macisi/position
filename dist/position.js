define("#position/0.9.2/position",["#jquery/1.7.2/jquery"],function(require,exports){function normalize(posObject){posObject=toElement(posObject)||{},posObject.nodeType&&(posObject={element:posObject});var element=toElement(posObject.element)||VIEWPORT;if(element.nodeType!==1)throw new Error("posObject.element is invalid.");var result={element:element,x:posObject.x||0,y:posObject.y||0},isVIEWPORT=element===VIEWPORT||element._id==="VIEWPORT";return result.offset=function(){return isPinFixed?{left:0,top:0}:isVIEWPORT?{left:$(document).scrollLeft(),top:$(document).scrollTop()}:$(element).offset()},result.size=function(){var el=isVIEWPORT?$(window):$(element);return{width:el.outerWidth(),height:el.outerHeight()}},result}function posConverter(pinObject){pinObject.x=xyConverter(pinObject.x,pinObject,"width"),pinObject.y=xyConverter(pinObject.y,pinObject,"height")}function xyConverter(x,pinObject,type){x+="",x=x.replace(/px/gi,""),/\D/.test(x)&&(x=x.replace(/(?:top|left)/gi,"0%").replace(/center/gi,"50%").replace(/(?:bottom|right)/gi,"100%")),x.indexOf("%")!==-1&&(x=x.replace(/(\d+\.?\d+)%/gi,function(m,d){return pinObject.size()[type]*(d/100)}));if(/[+\-*\/]/.test(x))try{x=(new Function("return "+x))()}catch(e){throw new Error("Invalid position value: "+x)}return numberize(x)}function getParentOffset(element){var parent=element.offsetParent();parent[0]===document.documentElement&&(parent=$(document.body)),isIE6&&parent.css("zoom",1);var offset=parent[0]===document.body?{left:0,top:0}:parent.offset();return offset.top+=numberize(parent.css("border-top-width")),offset.left+=numberize(parent.css("border-left-width")),offset}function numberize(s){return parseFloat(s,10)||0}function toElement(element){return $(element)[0]}var Position=exports,VIEWPORT={_id:"VIEWPORT",nodeType:1},$=require("#jquery/1.7.2/jquery"),isPinFixed=!1,isIE6=$.browser.msie&&$.browser.version==6;Position.pin=function(pinObject,baseObject){pinObject=normalize(pinObject),baseObject=normalize(baseObject);var pinElement=$(pinObject.element);pinElement.css("position")!=="fixed"||isIE6?(pinElement.css("position","absolute"),isPinFixed=!1):isPinFixed=!0,posConverter(pinObject),posConverter(baseObject);var parentOffset=getParentOffset(pinElement),baseOffset=baseObject.offset(),top=baseOffset.top+baseObject.y-pinObject.y-parentOffset.top,left=baseOffset.left+baseObject.x-pinObject.x-parentOffset.left;pinElement.css({left:left,top:top})},Position.center=function(pinElement,baseElement){Position.pin({element:pinElement,x:"50%",y:"50%"},{element:baseElement,x:"50%",y:"50%"})},Position.VIEWPORT=VIEWPORT});