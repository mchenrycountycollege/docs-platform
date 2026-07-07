---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/advanced-code-editor/css-editor-snippets.html
title: CSS Editor Snippets - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Advanced Code Editor

**.** - ${1} {, ${2}, }

**!** - !important

**bdi:m+** - -moz-border-image: url(${1}) ${2:0} ${3:0} ${4:0} ${5:0} ${6:stretch} ${7:stretch};

**bdi:m** - -moz-border-image: ${1};

**bdrz:m** - -moz-border-radius: ${1};

**bxsh:m+** - -moz-box-shadow: ${1:0} ${2:0} ${3:0} #${4:000};

**bxsh:m** - -moz-box-shadow: ${1};

**bdi:w+** - -webkit-border-image: url(${1}) ${2:0} ${3:0} ${4:0} ${5:0} ${6:stretch} ${7:stretch};

**bdi:w** - -webkit-border-image: ${1};

**bdrz:w** - -webkit-border-radius: ${1};

**bxsh:w+** - -webkit-box-shadow: ${1:0} ${2:0} ${3:0} #${4:000};

**bxsh:w** - -webkit-box-shadow: ${1};

**@f** - @font-face {, font-family: ${1};, src: url(${2});, }

**@i** - @import url(${1});

**@m** - @media ${1:print} {, ${2}, }

**bg+** - background: #${1:FFF} url(${2}) ${3:0} ${4:0} ${5:no-repeat};

**bga** - background-attachment: ${1};

**bga:f** - background-attachment: fixed;

**bga:s** - background-attachment: scroll;

**bgbk** - background-break: ${1};

**bgbk:bb** - background-break: bounding-box;

**bgbk:c** - background-break: continuous;

**bgbk:eb** - background-break: each-box;

**bgcp** - background-clip: ${1};

**bgcp:bb** - background-clip: border-box;

**bgcp:cb** - background-clip: content-box;

**bgcp:nc** - background-clip: no-clip;

**bgcp:pb** - background-clip: padding-box;

**bgc** - background-color: #${1:FFF};

**bgc:t** - background-color: transparent;

**bgi** - background-image: url(${1});

**bgi:n** - background-image: none;

**bgo** - background-origin: ${1};

**bgo:bb** - background-origin: border-box;

**bgo:cb** - background-origin: content-box;

**bgo:pb** - background-origin: padding-box;

**bgpx** - background-position-x: ${1};

**bgpy** - background-position-y: ${1};

**bgp** - background-position: ${1:0} ${2:0};

**bgr** - background-repeat: ${1};

**bgr:n** - background-repeat: no-repeat;

**bgr:x** - background-repeat: repeat-x;

**bgr:y** - background-repeat: repeat-y;

**bgr:r** - background-repeat: repeat;

**bgz** - background-size: ${1};

**bgz:a** - background-size: auto;

**bgz:ct** - background-size: contain;

**bgz:cv** - background-size: cover;

**bg** - background: ${1};

**bg:ie** - filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${1}', sizingMethod='${2:crop}');

**bg:n** - background: none;

**bd+** - border: ${1:1px} ${2:solid} #${3:000};

**bdb+** - border-bottom: ${1:1px} ${2:solid} #${3:000};

**bdbc** - border-bottom-color: #${1:000};

**bdbi** - border-bottom-image: url(${1});

**bdbi:n** - border-bottom-image: none;

**bdbli** - border-bottom-left-image: url(${1});

**bdbli:c** - border-bottom-left-image: continue;

**bdbli:n** - border-bottom-left-image: none;

**bdblrz** - border-bottom-left-radius: ${1};

**bdbri** - border-bottom-right-image: url(${1});

**bdbri:c** - border-bottom-right-image: continue;

**bdbri:n** - border-bottom-right-image: none;

**bdbrrz** - border-bottom-right-radius: ${1};

**bdbs** - border-bottom-style: ${1};

**bdbs:n** - border-bottom-style: none;

**bdbw** - border-bottom-width: ${1};

**bdb** - border-bottom: ${1};

**bdb:n** - border-bottom: none;

**bdbk** - border-break: ${1};

**bdbk:c** - border-break: close;

**bdcl** - border-collapse: ${1};

**bdcl:c** - border-collapse: collapse;

**bdcl:s** - border-collapse: separate;

**bdc** - border-color: #${1:000};

**bdci** - border-corner-image: url(${1});

**bdci:c** - border-corner-image: continue;

**bdci:n** - border-corner-image: none;

**bdf** - border-fit: ${1};

**bdf:c** - border-fit: clip;

**bdf:of** - border-fit: overwrite;

**bdf:ow** - border-fit: overwrite;

**bdf:r** - border-fit: repeat;

**bdf:sc** - border-fit: scale;

**bdf:sp** - border-fit: space;

**bdf:st** - border-fit: stretch;

**bdi** - border-image: url(${1}) ${2:0} ${3:0} ${4:0} ${5:0} ${6:stretch} ${7:stretch};

**bdi:n** - border-image: none;

**bdl+** - border-left: ${1:1px} ${2:solid} #${3:000};

**bdlc** - border-left-color: #${1:000};

**bdli** - border-left-image: url(${1});

**bdli:n** - border-left-image: none;

**bdls** - border-left-style: ${1};

**bdls:n** - border-left-style: none;

**bdlw** - border-left-width: ${1};

**bdl** - border-left: ${1};

**bdl:n** - border-left: none;

**bdlt** - border-length: ${1};

**bdlt:a** - border-length: auto;

**bdrz** - border-radius: ${1};

**bdr+** - border-right: ${1:1px} ${2:solid} #${3:000};

**bdrc** - border-right-color: #${1:000};

**bdri** - border-right-image: url(${1});

**bdri:n** - border-right-image: none;

**bdrs** - border-right-style: ${1};

**bdrs:n** - border-right-style: none;

**bdrw** - border-right-width: ${1};

**bdr** - border-right: ${1};

**bdr:n** - border-right: none;

**bdsp** - border-spacing: ${1};

**bds** - border-style: ${1};

**bds:ds** - border-style: dashed;

**bds:dtds** - border-style: dot-dash;

**bds:dtdtds** - border-style: dot-dot-dash;

**bds:dt** - border-style: dotted;

**bds:db** - border-style: double;

**bds:g** - border-style: groove;

**bds:h** - border-style: hidden;

**bds:i** - border-style: inset;

**bds:n** - border-style: none;

**bds:o** - border-style: outset;

**bds:r** - border-style: ridge;

**bds:s** - border-style: solid;

**bds:w** - border-style: wave;

**bdt+** - border-top: ${1:1px} ${2:solid} #${3:000};

**bdtc** - border-top-color: #${1:000};

**bdti** - border-top-image: url(${1});

**bdti:n** - border-top-image: none;

**bdtli** - border-top-left-image: url(${1});

**bdtli:c** - border-corner-image: continue;

**bdtli:n** - border-corner-image: none;

**bdtlrz** - border-top-left-radius: ${1};

**bdtri** - border-top-right-image: url(${1});

**bdtri:c** - border-top-right-image: continue;

**bdtri:n** - border-top-right-image: none;

**bdtrrz** - border-top-right-radius: ${1};

**bdts** - border-top-style: ${1};

**bdts:n** - border-top-style: none;

**bdtw** - border-top-width: ${1};

**bdt** - border-top: ${1};

**bdt:n** - border-top: none;

**bdw** - border-width: ${1};

**bd** - border: ${1};

**bd:n** - border: none;

**b** - bottom: ${1};

**b:a** - bottom: auto;

**bxsh+** - box-shadow: ${1:0} ${2:0} ${3:0} #${4:000};

**bxsh** - box-shadow: ${1};

**bxsh:n** - box-shadow: none;

**bxz** - box-sizing: ${1};

**bxz:bb** - box-sizing: border-box;

**bxz:cb** - box-sizing: content-box;

**cps** - caption-side: ${1};

**cps:b** - caption-side: bottom;

**cps:t** - caption-side: top;

**cl** - clear: ${1};

**cl:b** - clear: both;

**cl:l** - clear: left;

**cl:n** - clear: none;

**cl:r** - clear: right;

**cp** - clip: ${1};

**cp:a** - clip: auto;

**cp:r** - clip: rect(${1:0} ${2:0} ${3:0} ${4:0});

**c** - color: #${1:000};

**ct** - content: ${1};

**ct:a** - content: attr(${1});

**ct:cq** - content: close-quote;

**ct:c** - content: counter(${1});

**ct:cs** - content: counters(${1});

**ct:ncq** - content: no-close-quote;

**ct:noq** - content: no-open-quote;

**ct:n** - content: normal;

**ct:oq** - content: open-quote;

**coi** - counter-increment: ${1};

**cor** - counter-reset: ${1};

**cur** - cursor: ${1};

**cur:a** - cursor: auto;

**cur:c** - cursor: crosshair;

**cur:d** - cursor: default;

**cur:ha** - cursor: hand;

**cur:he** - cursor: help;

**cur:m** - cursor: move;

**cur:p** - cursor: pointer;

**cur:t** - cursor: text;

**d** - display: ${1};

**d:mib** - display: -moz-inline-box;

**d:mis** - display: -moz-inline-stack;

**d:b** - display: block;

**d:cp** - display: compact;

**d:ib** - display: inline-block;

**d:itb** - display: inline-table;

**d:i** - display: inline;

**d:li** - display: list-item;

**d:n** - display: none;

**d:ri** - display: run-in;

**d:tbcp** - display: table-caption;

**d:tbc** - display: table-cell;

**d:tbclg** - display: table-column-group;

**d:tbcl** - display: table-column;

**d:tbfg** - display: table-footer-group;

**d:tbhg** - display: table-header-group;

**d:tbrg** - display: table-row-group;

**d:tbr** - display: table-row;

**d:tb** - display: table;

**ec** - empty-cells: ${1};

**ec:h** - empty-cells: hide;

**ec:s** - empty-cells: show;

**exp** - expression()

**fl** - float: ${1};

**fl:l** - float: left;

**fl:n** - float: none;

**fl:r** - float: right;

**f+** - font: ${1:1em} ${2:Arial}, ${3:sans-serif};

**fef** - font-effect: ${1};

**fef:eb** - font-effect: emboss;

**fef:eg** - font-effect: engrave;

**fef:n** - font-effect: none;

**fef:o** - font-effect: outline;

**femp** - font-emphasize-position: ${1};

**femp:a** - font-emphasize-position: after;

**femp:b** - font-emphasize-position: before;

**fems** - font-emphasize-style: ${1};

**fems:ac** - font-emphasize-style: accent;

**fems:c** - font-emphasize-style: circle;

**fems:ds** - font-emphasize-style: disc;

**fems:dt** - font-emphasize-style: dot;

**fems:n** - font-emphasize-style: none;

**fem** - font-emphasize: ${1};

**ff** - font-family: ${1};

**ff:c** - font-family: ${1:'Monotype Corsiva','Comic Sans MS'}, cursive;

**ff:f** - font-family: ${1:Capitals - Impact}, fantasy;

**ff:m** - font-family: ${1:Monaco - 'Courier New'}, monospace;

**ff:ss** - font-family: ${1:Helvetica - Arial}, sans-serif;

**ff:s** - font-family: ${1:Georgia - 'Times New Roman'}, serif;

**fza** - font-size-adjust: ${1};

**fza:n** - font-size-adjust: none;

**fz** - font-size: ${1};

**fsm** - font-smooth: ${1};

**fsm:aw** - font-smooth: always;

**fsm:a** - font-smooth: auto;

**fsm:n** - font-smooth: never;

**fst** - font-stretch: ${1};

**fst:c** - font-stretch: condensed;

**fst:e** - font-stretch: expanded;

**fst:ec** - font-stretch: extra-condensed;

**fst:ee** - font-stretch: extra-expanded;

**fst:n** - font-stretch: normal;

**fst:sc** - font-stretch: semi-condensed;

**fst:se** - font-stretch: semi-expanded;

**fst:uc** - font-stretch: ultra-condensed;

**fst:ue** - font-stretch: ultra-expanded;

**fs** - font-style: ${1};

**fs:i** - font-style: italic;

**fs:n** - font-style: normal;

**fs:o** - font-style: oblique;

**fv** - font-variant: ${1};

**fv:n** - font-variant: normal;

**fv:sc** - font-variant: small-caps;

**fw** - font-weight: ${1};

**fw:b** - font-weight: bold;

**fw:br** - font-weight: bolder;

**fw:lr** - font-weight: lighter;

**fw:n** - font-weight: normal;

**f** - font: ${1};

**h** - height: ${1};

**h:a** - height: auto;

**l** - left: ${1};

**l:a** - left: auto;

**lts** - letter-spacing: ${1};

**lh** - line-height: ${1};

**lisi** - list-style-image: url(${1});

**lisi:n** - list-style-image: none;

**lisp** - list-style-position: ${1};

**lisp:i** - list-style-position: inside;

**lisp:o** - list-style-position: outside;

**list** - list-style-type: ${1};

**list:c** - list-style-type: circle;

**list:dclz** - list-style-type: decimal-leading-zero;

**list:dc** - list-style-type: decimal;

**list:d** - list-style-type: disc;

**list:lr** - list-style-type: lower-roman;

**list:n** - list-style-type: none;

**list:s** - list-style-type: square;

**list:ur** - list-style-type: upper-roman;

**lis** - list-style: ${1};

**lis:n** - list-style: none;

**mb** - margin-bottom: ${1};

**mb:a** - margin-bottom: auto;

**ml** - margin-left: ${1};

**ml:a** - margin-left: auto;

**mr** - margin-right: ${1};

**mr:a** - margin-right: auto;

**mt** - margin-top: ${1};

**mt:a** - margin-top: auto;

**m** - margin: ${1};

**m:4** - margin: ${1:0} ${2:0} ${3:0} ${4:0};

**m:3** - margin: ${1:0} ${2:0} ${3:0};

**m:2** - margin: ${1:0} ${2:0};

**m:0** - margin: 0;

**m:a** - margin: auto;

**mah** - max-height: ${1};

**mah:n** - max-height: none;

**maw** - max-width: ${1};

**maw:n** - max-width: none;

**mih** - min-height: ${1};

**miw** - min-width: ${1};

**op** - opacity: ${1};

**op:ie** - filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=${1:100});

**op:ms** - -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=${1:100})';

**orp** - orphans: ${1};

**o+** - outline: ${1:1px} ${2:solid} #${3:000};

**oc** - outline-color: ${1:#000};

**oc:i** - outline-color: invert;

**oo** - outline-offset: ${1};

**os** - outline-style: ${1};

**ow** - outline-width: ${1};

**o** - outline: ${1};

**o:n** - outline: none;

**ovs** - overflow-style: ${1};

**ovs:a** - overflow-style: auto;

**ovs:mq** - overflow-style: marquee;

**ovs:mv** - overflow-style: move;

**ovs:p** - overflow-style: panner;

**ovs:s** - overflow-style: scrollbar;

**ovx** - overflow-x: ${1};

**ovx:a** - overflow-x: auto;

**ovx:h** - overflow-x: hidden;

**ovx:s** - overflow-x: scroll;

**ovx:v** - overflow-x: visible;

**ovy** - overflow-y: ${1};

**ovy:a** - overflow-y: auto;

**ovy:h** - overflow-y: hidden;

**ovy:s** - overflow-y: scroll;

**ovy:v** - overflow-y: visible;

**ov** - overflow: ${1};

**ov:a** - overflow: auto;

**ov:h** - overflow: hidden;

**ov:s** - overflow: scroll;

**ov:v** - overflow: visible;

**pb** - padding-bottom: ${1};

**pl** - padding-left: ${1};

**pr** - padding-right: ${1};

**pt** - padding-top: ${1};

**p** - padding: ${1};

**p:4** - padding: ${1:0} ${2:0} ${3:0} ${4:0};

**p:3** - padding: ${1:0} ${2:0} ${3:0};

**p:2** - padding: ${1:0} ${2:0};

**p:0** - padding: 0;

**pgba** - page-break-after: ${1};

**pgba:aw** - page-break-after: always;

**pgba:a** - page-break-after: auto;

**pgba:l** - page-break-after: left;

**pgba:r** - page-break-after: right;

**pgbb** - page-break-before: ${1};

**pgbb:aw** - page-break-before: always;

**pgbb:a** - page-break-before: auto;

**pgbb:l** - page-break-before: left;

**pgbb:r** - page-break-before: right;

**pgbi** - page-break-inside: ${1};

**pgbi:a** - page-break-inside: auto;

**pgbi:av** - page-break-inside: avoid;

**pos** - position: ${1};

**pos:a** - position: absolute;

**pos:f** - position: fixed;

**pos:r** - position: relative;

**pos:s** - position: static;

**q** - quotes: ${1};

**q:en** - quotes: '\\201C' '\\201D' '\\2018' '\\2019';

**q:n** - quotes: none;

**q:ru** - quotes: '\\00AB' '\\00BB' '\\201E' '\\201C';

**rz** - resize: ${1};

**rz:b** - resize: both;

**rz:h** - resize: horizontal;

**rz:n** - resize: none;

**rz:v** - resize: vertical;

**r** - right: ${1};

**r:a** - right: auto;

**tbl** - table-layout: ${1};

**tbl:a** - table-layout: auto;

**tbl:f** - table-layout: fixed;

**tal** - text-align-last: ${1};

**tal:a** - text-align-last: auto;

**tal:c** - text-align-last: center;

**tal:l** - text-align-last: left;

**tal:r** - text-align-last: right;

**ta** - text-align: ${1};

**ta:c** - text-align: center;

**ta:l** - text-align: left;

**ta:r** - text-align: right;

**td** - text-decoration: ${1};

**td:l** - text-decoration: line-through;

**td:n** - text-decoration: none;

**td:o** - text-decoration: overline;

**td:u** - text-decoration: underline;

**te** - text-emphasis: ${1};

**te:ac** - text-emphasis: accent;

**te:a** - text-emphasis: after;

**te:b** - text-emphasis: before;

**te:c** - text-emphasis: circle;

**te:ds** - text-emphasis: disc;

**te:dt** - text-emphasis: dot;

**te:n** - text-emphasis: none;

**th** - text-height: ${1};

**th:a** - text-height: auto;

**th:f** - text-height: font-size;

**th:m** - text-height: max-size;

**th:t** - text-height: text-size;

**ti** - text-indent: ${1};

**ti:-** - text-indent: -9999px;

**tj** - text-justify: ${1};

**tj:a** - text-justify: auto;

**tj:d** - text-justify: distribute;

**tj:ic** - text-justify: inter-cluster;

**tj:ii** - text-justify: inter-ideograph;

**tj:iw** - text-justify: inter-word;

**tj:k** - text-justify: kashida;

**tj:t** - text-justify: tibetan;

**to+** - text-outline: ${1:0} ${2:0} #${3:000};

**to** - text-outline: ${1};

**to:n** - text-outline: none;

**tr** - text-replace: ${1};

**tr:n** - text-replace: none;

**tsh+** - text-shadow: ${1:0} ${2:0} ${3:0} #${4:000};

**tsh** - text-shadow: ${1};

**tsh:n** - text-shadow: none;

**tt** - text-transform: ${1};

**tt:c** - text-transform: capitalize;

**tt:l** - text-transform: lowercase;

**tt:n** - text-transform: none;

**tt:u** - text-transform: uppercase;

**tw** - text-wrap: ${1};

**tw:no** - text-wrap: none;

**tw:n** - text-wrap: normal;

**tw:s** - text-wrap: suppress;

**tw:u** - text-wrap: unrestricted;

**t** - top: ${1};

**t:a** - top: auto;

**va** - vertical-align: ${1};

**va:bl** - vertical-align: baseline;

**va:b** - vertical-align: bottom;

**va:m** - vertical-align: middle;

**va:sub** - vertical-align: sub;

**va:sup** - vertical-align: super;

**va:tb** - vertical-align: text-bottom;

**va:tt** - vertical-align: text-top;

**va:t** - vertical-align: top;

**v** - visibility: ${1};

**v:c** - visibility: collapse;

**v:h** - visibility: hidden;

**v:v** - visibility: visible;

**whsc** - white-space-collapse: ${1};

**whsc:ba** - white-space-collapse: break-all;

**whsc:bs** - white-space-collapse: break-strict;

**whsc:k** - white-space-collapse: keep-all;

**whsc:l** - white-space-collapse: loose;

**whsc:n** - white-space-collapse: normal;

**whs** - white-space: ${1};

**whs:n** - white-space: normal;

**whs:nw** - white-space: nowrap;

**whs:pl** - white-space: pre-line;

**whs:pw** - white-space: pre-wrap;

**whs:p** - white-space: pre;

**wid** - widows: ${1};

**w** - width: ${1};

**w:a** - width: auto;

**wob** - word-break: ${1};

**wob:ba** - word-break: break-all;

**wob:bs** - word-break: break-strict;

**wob:k** - word-break: keep-all;

**wob:l** - word-break: loose;

**wob:n** - word-break: normal;

**wos** - word-spacing: ${1};

**wow** - word-wrap: ${1};

**wow:no** - word-wrap: none;

**wow:n** - word-wrap: normal;

**wow:s** - word-wrap: suppress;

**wow:u** - word-wrap: unrestricted;

**z** - z-index: ${1};

**z:a** - z-index: auto;

**zoo** - zoom: 1;

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }