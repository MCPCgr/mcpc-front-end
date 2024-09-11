import { p2s } from '../utils/utils';
export default {
  name: 'LinkLine',
  props: {
    styles: Object,
    data: Array,
    unit: Number,
    offsetY: Number,
    minTime: Number,
    rowHeight: Number,
    barHeight: Number,
    maxTextWidth: Number,
    progressWidth: Number,
    onClickLink: Function
  },
  render() {
    const x0 = this.maxTextWidth+this.progressWidth;
    const y0 = (this.rowHeight / 2) + this.offsetY;

    const map = {};
    this.data.forEach((v, i) => {
      map[v.id] = i;
    });
    return (
      <g>
        {this.data.map((s, i) => {
          if (!s.end || !s.start || !s.links) {
            return null;
          }
          return s.links.map((l) => {
            const j = map[l.target];
            const e = this.data[j];

            if (!e || !e.start || !e.end) return null;

            const gap = 12;
            const arrow = 6;
            const mgap = e.type === 'milestone' ? this.barHeight / 2 : 0;
            const y1 = y0 + i * this.rowHeight;
            const y2 = y0 + j * this.rowHeight;

            let vgap = this.barHeight / 2 + 4;
            if (y1 > y2) {
              vgap = -vgap;
            }

            if (l.type === 'FS') {
              const x1 = x0 + (s.end - this.minTime) / this.unit;
              const x2 = x0 + (e.start - this.minTime) / this.unit - mgap;
              const p1 = [
                [x1, y1],
                [x1 + gap, y1]
              ];
              if (x2 - x1 >= 2 * gap) {
                p1.push([x1 + gap, y2]);
              } else {
                p1.push([x1 + gap, y2 - vgap]);
                p1.push([x2 - gap, y2 - vgap]);
                p1.push([x2 - gap, y2]);
              }
              p1.push([x2 - arrow, y2]);
              const p2 = [
                [x2 - arrow, y2 - arrow],
                [x2, y2],
                [x2 - arrow, y2 + arrow]
              ];
              return (
                <g>
                  <polyline points={this.p2s(p1)} style={this.styles.link} onClick={()=>this.onClickLink(l)}  />
                  <polygon points={this.p2s(p2)} style={this.styles.linkArrow} />
                </g>
              );
            }
            if (l.type === 'FF') {
              const x1 = x0 + (s.end - this.minTime) / this.unit;
              const x2 = x0 + (e.end - this.minTime) / this.unit + mgap;
              const p1 = [
                [x1, y1],
                [x1 + gap, y1]
              ];
              if (x2 <= x1) {
                p1.push([x1 + gap, y2]);
              } else {
                p1.push([x1 + gap, y2 - vgap]);
                p1.push([x2 + gap, y2 - vgap]);
                p1.push([x2 + gap, y2]);
              }
              p1.push([x2 + arrow, y2]);
              const p2 = [
                [x2 + arrow, y2 - arrow],
                [x2, y2],
                [x2 + arrow, y2 + arrow]
              ];
              return (
                <g>
                  <polyline points={this.p2s(p1)} style={this.styles.link} onClick={()=>this.onClickLink(l)} />
                  <polygon points={this.p2s(p2)} style={this.styles.linkArrow} />
                </g>
              );
            }
            if (l.type === 'SS') {
              const x1 = x0 + (s.start - this.minTime) / this.unit;
              const x2 = x0 + (e.start - this.minTime) / this.unit - mgap;
              const p1 = [
                [x1, y1],
                [x1 - gap, y1]
              ];
              if (x1 <= x2) {
                p1.push([x1 - gap, y2]);
              } else {
                p1.push([x1 - gap, y2 - vgap]);
                p1.push([x2 - gap, y2 - vgap]);
                p1.push([x2 - gap, y2]);
              }
              p1.push([x2 - arrow, y2]);
              const p2 = [
                [x2 - arrow, y2 - arrow],
                [x2, y2],
                [x2 - arrow, y2 + arrow]
              ];
              return (
                <g>
                  <polyline points={this.p2s(p1)} style={this.styles.link} onClick={()=>this.onClickLink(l)} />
                  <polygon points={this.p2s(p2)} style={this.styles.linkArrow} />
                </g>
              );
            }
            if (l.type === 'SF') {
              const x1 = x0 + (s.start - this.minTime) / this.unit;
              const x2 = x0 + (e.end - this.minTime) / this.unit + mgap;
              const p1 = [
                [x1, y1],
                [x1 - gap, y1]
              ];
              if (x1 - x2 >= 2 * gap) {
                p1.push([x1 - gap, y2]);
              } else {
                p1.push([x1 - gap, y2 - vgap]);
                p1.push([x2 + gap, y2 - vgap]);
                p1.push([x2 + gap, y2]);
              }
              p1.push([x2 + arrow, y2]);
              const p2 = [
                [x2 + arrow, y2 - arrow],
                [x2, y2],
                [x2 + arrow, y2 + arrow]
              ];
              return (
                <g>
                  <polyline points={this.p2s(p1)} style={this.styles.link} onClick={()=>this.onClickLink(l)} />
                  <polygon points={this.p2s(p2)} style={this.styles.linkArrow} />
                </g>
              );
            }
            return null;
          });
        })}
      </g>
    );
  },
  methods: {
    p2s(arr) {
      return arr.map((p) => `${p[0]},${p[1]}`).join(' ');
    }
  }
};
