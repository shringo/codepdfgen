window.onload = function () {
  window.jsPDF = window.jspdf.jsPDF;
  const btn = document.getElementById("submit");

  btn.onclick = function(e) {
    const link = document.getElementById("link").value;
    const csv = document.getElementById("csv").value.split(",");

    const card = new jsPDF("landscape", "in", [3, 5]);

    const centeredText = function(text, y) {
      const xOffset = card.internal.pageSize.width / 2; 
      const yOffset = (card.internal.pageSize.height / 2) - (card.internal.getFontSize() / (2 * card.internal.scaleFactor));

      card.text(text, xOffset, yOffset + y, { align: 'center', lineHeight: 1 });
    }

    const getCC = (str) => parseInt(str.slice(3, -2));
    let previousCC;

    console.log(card.getFontList());

    for(let i = 0; i < csv.length; i++) {
      const id = csv[i];
      if (i !== 0) card.addPage();

      if(previousCC !== getCC(id)) {
        if (i !== 0) card.addPage();
        previousCC = getCC(id);
      }

      card.setFontSize(20);
      card.setFont('Helvetica', 'Bold');
      card.setTextColor(90, 90, 255);
      centeredText(link, -0.2);
      card.setFont('Helvetica', '');
      card.setTextColor(0, 0, 0);
      centeredText(id, 0.2);
    }

    const o = card.output("datauristring");
    window.open(o, '_new');
  };
}