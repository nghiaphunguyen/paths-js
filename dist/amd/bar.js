(function() {
  define(['./ops', './linear', './rectangle'], function(O, Linear, Rectangle) {
    return function(_arg) {
      var accessor, bottom, colors, cols, curves, d, data, el, g, group_width, groups, gutter, height, i, j, left, line, max, min, n, right, scale, shift, top, val, w, width, _i, _j, _k, _l, _len, _len1, _len2, _len3;
      data = _arg.data, accessor = _arg.accessor, width = _arg.width, height = _arg.height, gutter = _arg.gutter, colors = _arg.colors;
      if (accessor == null) {
        accessor = function(x) {
          return x;
        };
      }
      if (gutter == null) {
        gutter = 0;
      }
      if (colors == null) {
        colors = O.random_colors;
      }
      groups = [];
      min = 0;
      max = 0;
      cols = [];
      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        d = data[i];
        if (cols[i] == null) {
          cols[i] = colors(i);
        }
        for (j = _j = 0, _len1 = d.length; _j < _len1; j = ++_j) {
          el = d[j];
          val = -accessor(el);
          if (-val < min) {
            min = -val;
          }
          if (-val > max) {
            max = -val;
          }
          if (groups[j] == null) {
            groups[j] = [];
          }
          groups[j][i] = val;
        }
      }
      n = groups.length;
      group_width = (width - gutter * (n - 1)) / n;
      curves = [];
      scale = Linear([-min, -max], [height, 0]);
      for (i = _k = 0, _len2 = groups.length; _k < _len2; i = ++_k) {
        g = groups[i];
        w = group_width / g.length;
        shift = (group_width + gutter) * i;
        for (j = _l = 0, _len3 = g.length; _l < _len3; j = ++_l) {
          el = g[j];
          left = shift + w * j;
          right = left + w;
          bottom = scale(0);
          top = scale(el);
          line = Rectangle({
            left: left,
            right: right,
            bottom: bottom,
            top: top
          });
          curves.push({
            line: line,
            color: cols[j]
          });
        }
      }
      return {
        curves: curves,
        scale: scale
      };
    };
  });

}).call(this);
