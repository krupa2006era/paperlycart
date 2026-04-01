const products = [
  { name: "HAUSER PENCIL", price: 60, pieces: 10, category: "Pencils", image:"images/h.png"},
  { name: "APSARA PLATINUM PENCIL", price: 60, pieces: 10, category: "Pencils",image:"images/apsarapla.png" },
  { name: "NATARAJ PENCIL", price: 50, pieces: 10, category: "Pencils",image:"images/nataraj.png" },
  { name: "FLAIR PENCIL", price: 60, pieces: 10, category: "Pencils",image:"images/flair.png" },
  { name: "DOMS PENCILS", price: 60, pieces: 60, category: "Pencils",image:"images/doms.png"},
  { name: "DOMS NEON PENCILS", price: 60, pieces: 10, category: "Pencils",image:"images/domsneo.png" },

  { name: "FLAIR PENPENCIL (MECHTRON)", price: 300, pieces: 20, category: "Pen Pencils" },
  { name: "FLAIR  ARTI GRAFF PENPENCIL", price: 300, pieces: 20, category: "Pen Pencils",image:"images/arti.png" },
  { name: "FLAIR PENPENCIL (MOVE, MECHANICAL)", price: 200, pieces: 10, category: "Pen Pencils",image:"images/flairmech.png" },
  { name: "FLAIR CREATIVE PEN PENCIL", price: 70, pieces: 10, category: "Pen Pencils",image:"images/flaircreative.png" },
  { name: "FLAIR PENPENCIL", price: 70, pieces: 10, category: "Pen Pencils",image:"images/ff.png" },
  { name: "SS BUTTERFLY PENS", price: 19, pieces: 5, category: "Pens",image:"images/ss.png" },
  { name: "GLEAN GLOW PENS", price: 65, pieces: 10, category: "Pens",image:"images/gleam.png" },
  { name: "0.7 REY MECH PENS", price: 25, pieces: 25, category: "Pens"},
  { name: "HI-GLOW PENS", price: 65, pieces: 10, category: "Pens",image:"images/hi.png" },
  { name: "GOLD TOUCH PENS", price: 70, pieces: 10, category: "Pens", image:"images/gold.png"},
  { name: "TOUCH FLOW PENS", price: 100, pieces: 100, category: "Pens",image:"images/touch.png" },
  { name: "HAUSER AUTO CLICK PEN", price: 70, pieces: 10, category: "Pens",image:"images/auto.png" },
  { name: "OX BALL PENS", price: 70, pieces: 10, category: "Pens",image:"images/ox.png" },
  { name: "OX GLOW BALL PENS", price: 75, pieces: 10, category: "Pens",image:"images/xoglow.png" },
  { name: "COPPER TOUCH PENS", price: 70, pieces: 10, category: "Pens",image:"images/coppertouch.png" },
  { name: "RADIUM PENS", price: 50, pieces: 20, category: "Pens",image:"images/lky.png" },
  { name: "ADD GEL PENS", price: 10, pieces: 10, category: "Pens",image:"images/addgel.png"},
  { name: "FLAIR NEO PENS", price: 70, pieces: 10, category: "Pens",image:"images/flairneo.png" },
  { name: "BRITE PENS", price: 20, pieces: 5, category: "Pens",image:"images/br.png" },
  { name: "RX1 PENS", price: 85, pieces:25, category: "Pens",image:"images/k.png"},
  

  { name: "APSARA TIDY ERASERS", price: 200, pieces: 20, category: "Erasers",image:"images/tidy.png" },
  { name: "APSARA STRIPS ERASERS", price: 100, pieces: 10, category: "Erasers",image:"images/st.png" },
  { name: "APSARA ERASERS", price: 250, pieces: 50, category: "Erasers",image:"images/ap.png" },
  { name: "DOMS (M-TECH ERASERS)", price: 240, pieces: 24, category: "Erasers",image:"images/tech.png" },
  { name: "DOMS ERASERS", price: 42, pieces: 10, category: "Erasers",image:"images/er.png"},
  { name: "LIPSTICK ERASERS", price: 16, pieces: 2, category: "Erasers",image:"images/lip.png" },
  { name: "TIRE ERASERS", price: 175, pieces: 40, category: "Erasers",image:"images/tt.png" },
  {name: "APSARA  MARVEL ERASERS", price: 200, pieces: 25, category: "Erasers",image:"images/apsaramarvel.png" },
  { name: "DOMES CAR ERASERS", price: 100, pieces: 12, category: "Erasers",image:"images/car.png" },

  { name: "VIKAS 15CM SCALES", price: 50, pieces: 10, category: "Scale",image:"images/v.png" },

  { name: "DOMS SHARPNERS", price: 75, pieces: 10, category: "Sharpener",image:"images/dd.png" },
  { name: "JAR SHARPNERS", price: 200, pieces: 100, category: "Sharpener",image:"images/ds.png" },

  { name: "BALAJI MINI SKETCHES", price: 375, pieces: 25, category: "Sketches",image:"images/mini.png" },
  { name: "BALAJI LARGE SKETCHES", price: 360, pieces: 12, category: "Sketches",image:"images/ll.png" },
  { name: "APSARA SKETCHES", price: 22, pieces: 1, category: "Sketches",image:"images/apa.png" },
  { name: "DOMS SKETCHES", price: 44, pieces: 4, category: "Sketches",image:"images/domss.png" },

  
  { name: "DOMS COLOURS", price: 99, pieces: 6, category: "Paint",image:"images/domsshades.png" },

  { name: "GLUE STICKS", price: 195, pieces: 24, category: "Glue",image:"images/gluestick.png" },
  { name: "LION GUM", price: 150, pieces: 30, category: "Glue" },
  { name: "FEVICOL", price: 400, pieces: 40, category: "Glue",image:"images/fe.png" },

  { name: "KEY CHAINS", price: 120, pieces: 12, category: "Accessory",image:"images/keychains.png" },
  { name: "PAPER SOAPES", price: 480, pieces: 24, category: "Soap papers",image:"images/soap.png" },


  { name: "POUCHES", price: 200, pieces: 20, category: "Pouches",image:"images/pp.png" },


  { name: "PROJECT MOTORS", price: 220, pieces: 12, category: "Motors" },

  { name: "FEVICOL SHEETS", price: 42, pieces: 10, category: "Sheets" },

  { name: "OX-LEADS", price: 25, pieces: 10, category: "Leads" },

  { name: "PAPER PLATES", price: 25, pieces: 10, category: "Paper Plates",image:"images/paper.png" },
  { name: "PAPER PLATES 2", price: 25, pieces: 10, category: "Paper Plates",image:"images/pa2.png" },


];