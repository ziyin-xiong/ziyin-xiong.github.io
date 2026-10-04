import fs from "node:fs";
import { PNG } from "pngjs";

const charts = [
  {
    source: "assets/img/projects/locomotion/notion/a1-curriculum-time.png",
    output: "assets/img/projects/locomotion/notion/a1-curriculum-time-clean.png",
    regions: [
      [33, 32, 215, 174],
      [268, 32, 448, 174],
      [510, 32, 689, 174],
    ],
    captionBands: [[32, 176, 699, 194]],
  },
  {
    source: "assets/img/projects/locomotion/notion/a1-mirror-1-5.png",
    output: "assets/img/projects/locomotion/notion/a1-mirror-1-5-clean.png",
    regions: [
      [34, 231, 224, 374],
      [268, 231, 485, 374],
      [520, 231, 740, 374],
    ],
    captionBands: [[34, 375, 743, 381]],
  },
];

for (const chart of charts) {
  const png = PNG.sync.read(fs.readFileSync(chart.source));

  for (const [left, top, right, bottom] of chart.regions) {
    for (let y = top; y < Math.min(bottom, png.height); y++) {
      for (let x = left; x < Math.min(right, png.width); x++) {
        const index = (y * png.width + x) * 4;
        const red = png.data[index];
        const green = png.data[index + 1];
        const blue = png.data[index + 2];
        const isMeasured = blue - red > 20 && green - red > 8 && blue - green > 8;
        const isCommanded = red - blue > 30 && green - blue > 20 && red - green > 20;

        // Keep the original colored data pixels; replace overprinted monochrome labels and legend boxes.
        if (!isMeasured && !isCommanded) {
          png.data[index] = 255;
          png.data[index + 1] = 255;
          png.data[index + 2] = 255;
          png.data[index + 3] = 255;
        }
      }
    }
  }

  for (const [left, top, right, bottom] of chart.captionBands) {
    for (let y = top; y < Math.min(bottom, png.height); y++) {
      for (let x = left; x < Math.min(right, png.width); x++) {
        const index = (y * png.width + x) * 4;
        png.data[index] = 255;
        png.data[index + 1] = 255;
        png.data[index + 2] = 255;
        png.data[index + 3] = 255;
      }
    }
  }

  fs.writeFileSync(chart.output, PNG.sync.write(png));
}
