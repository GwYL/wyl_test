;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-youxiang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.012041 630.535466l415.548448-346.226152c-2.25174-0.409407-4.274694-1.348636-6.610724-1.348636L103.074318 282.960677c-2.287865 0-4.32286 0.927187-6.5746 1.348636L512.012041 630.535466z"  ></path>' +
    '' +
    '<path d="M958.133584 320.144497c0-3.901411-1.071684-7.513829-2.25174-11.06604L661.313264 554.602446l295.014111 295.074318c0.758608-2.974224 1.806209-5.840075 1.806209-9.055127L958.133584 320.144497z"  ></path>' +
    '' +
    '<path d="M68.15428 309.042333c-1.143932 3.576294-2.287865 7.140546-2.287865 11.102164l0 520.465099c0 3.251176 1.119849 6.104986 1.854374 9.07921l295.110442-295.098401L68.15428 309.042333z"  ></path>' +
    '' +
    '<path d="M632.582502 578.492568l-108.697648 90.539229c-3.407714 2.901976-7.622201 4.298777-11.872813 4.298777-4.214487 0-8.453057-1.396802-11.896896-4.298777l-108.601317-90.491063L94.079398 875.963123c2.926058 0.770649 5.828034 1.842333 8.99492 1.842333l817.887488 0c3.227093 0 6.129069-1.059643 9.115334-1.842333L632.582502 578.492568z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-mima" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M762.829 454.914 762.829 307.208c0-135.399-109.785-245.184-245.184-245.184-1.686 0-2.906-0.098-4.566-0.049-1.368-0.024-3.102 0.073-4.493 0.073-135.43 0-245.166 109.785-245.166 245.184l0 147.682-86.782 0 0 507.125 675.268 0L851.906 454.914 762.829 454.914zM590.924 869.065 437.785 869.065l37.506-163.944c-22.434-13.356-37.506-37.774-37.506-65.782 0-42.293 34.283-76.576 76.563-76.576 42.292 0 76.575 34.283 76.575 76.576 0 28.117-15.2 52.621-37.787 65.954L590.924 869.065zM640.151 454.914 386.073 454.914 386.073 307.232c0-67.541 54.966-122.482 122.513-122.482 1.929 0 5.982-0.098 5.982-0.098s2.051 0.073 3.077 0.073c67.54 0 122.506 54.941 122.506 122.482L640.151 454.914z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-user" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M613.87269 505.924631c61.32674-34.796504 102.802364-100.587929 102.802364-176.107927 0-111.816668-90.623997-202.439642-202.439642-202.439642-111.818715 0-202.439642 90.622974-202.439642 202.439642 0 75.519997 41.435715 141.311423 102.799294 176.107927-152.777569 43.332924-264.751826 183.539176-264.751826 350.236779 0 22.298865 18.108426 40.488133 40.488133 40.488133 0.077771 0 0.196475-0.080841 0.277316-0.080841l0.037862 0.080841 647.136793 0 0.037862-0.080841c0.118704 0 0.198521 0.080841 0.317225 0.080841 22.338774 0 40.488133-18.189268 40.488133-40.488133C878.627586 689.463808 766.612397 549.257555 613.87269 505.924631z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-mobile" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M213.806741 213.806741l0-29.79973c0-65.860053 46.422332-119.297156 103.71628-119.297156l388.951912 0c57.270412 0 103.717303 53.437103 103.717303 119.297156l0 29.79973L213.806741 213.806741zM810.193259 263.505703l0 447.290656-596.386518 0L213.806741 263.505703 810.193259 263.505703zM810.193259 760.495321l0 85.225119c0 62.70622-46.447915 113.569705-103.717303 113.569705l-388.951912 0c-57.293948 0-103.71628-50.863485-103.71628-113.569705L213.807764 760.495321 810.193259 760.495321zM511.999488 909.882825c27.494218 0 49.795153-22.229303 49.795153-49.602771s-22.300934-49.504533-49.795153-49.504533-49.796176 22.131065-49.796176 49.504533S484.50527 909.882825 511.999488 909.882825z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)