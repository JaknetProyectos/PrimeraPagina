import { Destination } from "@/interfaces/Destination";

export const destinations: Destination[] = [
    {
        id: "dest-qr",
        slug: "quintana-roo",
        name: "Quintana Roo",
        short_description: "Paraíso caribeño y cuna de la civilización maya.",
        description: "Estado que alberga tesoros como Tulum, Cancún y Akumal, famoso por sus cenotes, playas de arena blanca y profunda historia arqueológica.",
        hero_image: "https://images.unsplash.com/photo-1544551763-47a0159c9638",
        card_image: "https://images.unsplash.com/photo-1544551763-47a0159c9638",
        highlights: ["Tulum", "Cenotes", "Snorkel con Tortugas"],
        bg_color: "#E0F7FA"
    },
    {
        id: "dest-cdmx",
        slug: "ciudad-de-mexico",
        name: "Ciudad de México",
        short_description: "Metrópolis vibrante llena de cultura y tradición.",
        description: "El corazón del país donde convergen los canales prehispánicos de Xochimilco, museos de clase mundial y una gastronomía urbana sin igual.",
        hero_image: "https://images.unsplash.com/photo-1512813588312-bf281d227531",
        card_image: "https://images.unsplash.com/photo-1512813588312-bf281d227531",
        highlights: ["Xochimilco", "Museo Frida Kahlo", "Teotihuacán"],
        bg_color: "#FCE4EC"
    },
    {
        id: "dest-jal",
        slug: "jalisco",
        name: "Jalisco",
        short_description: "Tierra del tequila y el folclore mexicano.",
        description: "Hogar de los campos de agave azul y la costa del Pacífico, donde la tradición del mariachi y el tequila cobran vida.",
        hero_image: "https://images.unsplash.com/photo-1516535794938-6063878f08cc",
        card_image: "https://images.unsplash.com/photo-1516535794938-6063878f08cc",
        highlights: ["Tequila", "Puerto Vallarta", "Guadalajara"],
        bg_color: "#FFF3E0"
    },
    {
        id: "dest-bc",
        slug: "baja-california",
        name: "Baja California",
        short_description: "Vinos de clase mundial y paisajes desérticos.",
        description: "Región vinícola por excelencia en México, famosa por sus valles productores y su innovadora cultura gastronómica costera.",
        hero_image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
        card_image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
        highlights: ["Valle de Guadalupe", "Cata de Vinos", "Paisajes"],
        bg_color: "#F3E5F5"
    },
    {
        id: "dest-bcs",
        slug: "baja-california-sur",
        name: "Baja California Sur",
        short_description: "Naturaleza marina salvaje en el Mar de Cortés.",
        description: "Destino de aventura marina donde el desierto se encuentra con el océano, ideal para el avistamiento de fauna y snorkel.",
        hero_image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf",
        card_image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf",
        highlights: ["Los Cabos", "Arrecifes", "Avistamiento de Vida Marina"],
        bg_color: "#E1F5FE"
    },
    {
        id: "dest-qro",
        slug: "queretaro",
        name: "Querétaro",
        short_description: "Historia colonial y rutas gourmet.",
        description: "Estado central con una rica herencia colonial y viñedos boutique que ofrecen experiencias de cata y maridaje excepcionales.",
        hero_image: "https://images.unsplash.com/photo-1528499919442-3f239bb53b77",
        card_image: "https://images.unsplash.com/photo-1528499919442-3f239bb53b77",
        highlights: ["Viñedos", "Centro Histórico", "Queserías"],
        bg_color: "#FFFDE7"
    },
    {
        id: "dest-oax",
        slug: "oaxaca",
        name: "Oaxaca",
        short_description: "Espiritualidad ancestral y riqueza gastronómica.",
        description: "Un mosaico cultural donde las tradiciones zapotecas y mayas se mantienen vivas a través de rituales como el temazcal y su cocina milenaria.",
        hero_image: "https://images.unsplash.com/photo-1515377196247-22b8a624ac90",
        card_image: "https://images.unsplash.com/photo-1515377196247-22b8a624ac90",
        highlights: ["Temazcal", "Gastronomía", "Artesanías"],
        bg_color: "#EFEBE9"
    },
    {
        id: "dest-edomex",
        slug: "estado-de-mexico",
        name: "Estado de México",
        short_description: "Santuarios naturales y monumentos antiguos.",
        description: "Rodeando la capital, ofrece desde la majestuosidad de Teotihuacán hasta pintorescos pueblos de conservación natural.",
        hero_image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6",
        card_image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6",
        highlights: ["Teotihuacán", "Ixtapan de la Sal", "Conservación"],
        bg_color: "#F1F8E9"
    },
    {
        id: "dest-tla",
        slug: "tlaxcala",
        name: "Tlaxcala",
        short_description: "Bosques de altura y volcanes imponentes.",
        description: "El estado más pequeño pero con grandes pulmones naturales como La Malinche, ideal para el senderismo y la aventura.",
        hero_image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        card_image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        highlights: ["La Malinche", "Senderismo", "Bosques"],
        bg_color: "#E8F5E9"
    },
    {
        id: "dest-pue",
        slug: "puebla",
        name: "Puebla",
        short_description: "Ciudad de los Ángeles y cuna del barroco.",
        description: "Famosa por su arquitectura colonial, sus iglesias y una de las gastronomías más complejas y ricas de México.",
        hero_image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a",
        card_image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a",
        highlights: ["Centro Histórico", "Mole Poblano", "Leyendas"],
        bg_color: "#F3F4F6"
    },
    {
        id: "dest-hgo",
        slug: "hidalgo",
        name: "Hidalgo",
        short_description: "Aguas termales y maravillas geológicas.",
        description: "Un destino de naturaleza pura, conocido por sus formaciones de cañones y ríos de agua caliente que brotan de la montaña.",
        hero_image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
        card_image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
        highlights: ["Tolantongo", "Grutas", "Montañas"],
        bg_color: "#E0F2F1"
    },
    {
        id: "dest-mich",
        slug: "michoacan",
        name: "Michoacán",
        short_description: "El alma de México y tradiciones eternas.",
        description: "Tierra de artesanos y pueblos mágicos donde la cultura se expresa en cada pieza de vidrio soplado y arquitectura colonial.",
        hero_image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf",
        card_image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf",
        highlights: ["Tlalpujahua", "Artesanías", "Pueblos Mágicos"],
        bg_color: "#FFF8E1"
    },
    {
        id: "dest-yuc",
        slug: "yucatan",
        name: "Yucatán",
        short_description: "Legado maya y ciudades amarillas.",
        description: "Epicentro de la cultura maya, con maravillas del mundo, pueblos coloniales pintorescos y una identidad gastronómica propia.",
        hero_image: "https://images.unsplash.com/photo-1512813588312-bf281d227531",
        card_image: "https://images.unsplash.com/photo-1512813588312-bf281d227531",
        highlights: ["Chichén Itzá", "Uxmal", "Izamal"],
        bg_color: "#FFF9C4"
    }
];