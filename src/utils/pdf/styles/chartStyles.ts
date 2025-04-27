
export const applyChartStyles = (charts: NodeListOf<Element>) => {
  charts.forEach((chart: Element) => {
    (chart as HTMLElement).style.margin = '25px auto';
    (chart as HTMLElement).style.height = 'auto';
    (chart as HTMLElement).style.minHeight = '300px';
    (chart as HTMLElement).style.width = '100%';
  });
};

export const applySvgStyles = (svgs: NodeListOf<Element>) => {
  svgs.forEach((svg: Element) => {
    (svg as SVGElement).setAttribute('width', '100%');
    (svg as SVGElement).setAttribute('height', '300');
    (svg as SVGElement).style.display = 'block';
    (svg as SVGElement).style.margin = '0 auto';
  });
};
