const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const productSchema = new Schema({
  title: { type: String, required: false },
  price: { type: Number, required: false },
  imagePath: { type: String, required: false },
  category: { type: String, required: false },
  productID: { type: String, required: false },
  brand: { type: String, required: false },
  model: { type: String, required: false },
  warranty: { type: String, required: false },
  pinned: { type: String, required: false },
  home: { type: String, required: false },
  features:{type: Array, required: false }
  
  // // General
  // title: { type: String, required: false },
  // price: { type: Number, required: false },
  // imagePath: { type: String, required: false },
  // category: { type: String, required: false },
  // productID: { type: String, required: false },
  // brand: { type: String, required: false },
  // model: { type: String, required: false },
  // warranty: { type: String, required: false },
  // pinned: { type: String, required: false },
  // home: { type: String, required: false },
  // user: { type: String, required: false },
  // // laptop
  // generation: { type: String, required: false },
  // precessor: { type: String, required: false },
  // clockSpeed: { type: String, required: false },
  // cache: { type: String, required: false },
  // chipset: { type: String, required: false },
  // ramType: { type: String, required: false },
  // ramSize: { type: String, required: false },
  // storageType: { type: String, required: false },
  // storageSize: { type: String, required: false },
  // ssd: { type: String, required: false },
  // graphicsChipset: { type: String, required: false },
  // graphicsMemory: { type: String, required: false },
  // networking: { type: String, required: false },
  // displayPort: { type: String, required: false },
  // audioPort: { type: String, required: false },
  // usbPort: { type: String, required: false },
  // displayType: { type: String, required: false },
  // displaySize: { type: String, required: false },
  // displayResolution: { type: String, required: false },
  // touch: { type: String, required: false },
  // opticalDevice: { type: String, required: false },
  // battery: { type: String, required: false },
  // backupTime: { type: String, required: false },
  // weight: { type: String, required: false },
  // color: { type: String, required: false },
  // operatingSystem: { type: String, required: false },
  // partNo: { type: String, required: false },
  // monitor: { type: String, required: false },
  // speaker: { type: String, required: false },
  // keyboard: { type: String, required: false },
  // mouse: { type: String, required: false },
  // casing: { type: String, required: false },
  // others: { type: String, required: false },
  
 
  // // processor: {
  //   baseFrequency: { type: String, required: false },
  //   turboFrequencyMax: { type: String, required: false },
  //   core: { type: String, required: false },
  //   thread: { type: String, required: false },
  //   smartCache: { type: String, required: false },
  //   busSpeed: { type: String, required: false },
  //   tdp: { type: String, required: false },
  //   lithography: { type: String, required: false },
  //   memoryMax: { type: String, required: false },
  //   memoryType: { type: String, required: false },
  //   memoryChannel: { type: String, required: false },
  //   socketsSupport: { type: String, required: false },
  //   specialty: { type: String, required: false },
  //   compatibleProducts: { type: String, required: false },
  
  // // mainBoard: {
  //   formFactor: { type: String, required: false },
  //   chipset: { type: String, required: false },
  //   supportedCPU: { type: String, required: false },
  //   ramType: { type: String, required: false },
  //   ramBus: { type: String, required: false },
  //   ramMax: { type: String, required: false },
  //   ramSlot: { type: String, required: false },
  //   pciExpressx16Slot: { type: String, required: false },
  //   sataPort: { type: String, required: false },
  //   audioChipset: { type: String, required: false },
  //   audioChannel: { type: String, required: false },
  //   lanChipset: { type: String, required: false },
  //   lanSpeed: { type: String, required: false },
  //   interfaceUSB: { type: String, required: false },
  //   usbPort: { type: String, required: false },
  //   vgaPort: { type: String, required: false },
  //   dviPort: { type: String, required: false },
  
  // graphicsCard: {
  //   interfaceBus: { type: String, required: false },
  //   engineClock: { type: String, required: false },
  //   memoryClock: { type: String, required: false },
  //   memorySize: { type: String, required: false },
  //   memoryType: { type: String, required: false },
  //   memoryBus: { type: String, required: false },
  //   digitalMaxResolution: { type: String, required: false },
  //   directXSupport: { type: String, required: false },
  //   openGLSupport: { type: String, required: false },
  //   dviPort: { type: String, required: false },
  //   hdmiPort: { type: String, required: false },
  //   displayPort: { type: String, required: false },
  //   recommendedPSU: { type: String, required: false },
  //   powerConnector: { type: String, required: false },
  //   multiDisplayCapability: { type: String, required: false },
  //   coolingFan: { type: String, required: false },
  //   pcbForm: { type: String, required: false }
  // },
  // desktopRAM: {
  //   for: { type: String, required: false },
  //   capacity: { type: String, required: false },
  //   busSpeed: { type: String, required: false }
  // },

  // opticalDevice: {

  //   interface: { type: String, required: false },
  //   buffer: { type: String, required: false },
  //   writeSpeed: { type: String, required: false },
  //   readSpeedDVD: { type: String, required: false },
  //   readSpeedCD: { type: String, required: false },
  //   formFactor: { type: String, required: false },
  //   supportingOS: { type: String, required: false }

  // },
  // powerSupply: {
  //   type: { type: String, required: false },
  //   psuCategory: { type: String, required: false },
  //   maximumPowerWT: { type: String, required: false },
  //   inputVoltage: { type: String, required: false },
  //   inputFrequencyRange: { type: String, required: false },
  //   inputCurrent: { type: String, required: false },
  //   overVoltageProtection: { type: String, required: false },
  //   fanSize: { type: String, required: false },
  //   atxMainConnetors: { type: String, required: false },
  //   sataPowerConnectors: { type: String, required: false },
  //   fourPinPeripheralConnectors: { type: String, required: false },
  //   floppyConnectors: { type: String, required: false },
  //   dimensions: { type: String, required: false }

  // },
  // // casing: {},
  // // casingFan: {},
  // // ups: {},
  // // cpuCooler: {},

  // // monitor: [{
  // //   square: [],
  // //   curved: [],
  // //   gaming3D: [],
  // //   fourK: []
  // // }],
  // // printer: {},
  // // tonerCartridge: {},
  // // photography: {},
  // // officeEquipment: {},
  // // tabletPC: {},
  // // smartWatch: {},
  // // server: {},
  // // scanner: {},
  // // software: {},
  // // storage: {},
  // // network: {},
  // // audioVideo: {},
  // // accessories: {},
  // // gaming: {},


 

  // // mobile

  // //Camera
  // effectivePixels: { type: String, required: false },
  // lens: { type: String, required: false },
  // sensorType: { type: String, required: false },
  // sensorSize: { type: String, required: false },
  // touchScreen: { type: String, required: false },
  // screenDots: { type: String, required: false },
  // imageRes: { type: String, required: false },
  // imageRatioWH: { type: String, required: false },
  // videoRes: { type: String, required: false },
  // videoFormat: { type: String, required: false },
  // playbackZoom: { type: String, required: false },
  // iso: { type: String, required: false },
  // isoMaximum: { type: String, required: false },
  // shutterSpeed: { type: String, required: false },
  // autofocusAssistLamp: { type: String, required: false },
  // manualFocus: { type: String, required: false },
  // numberOfFocusPoints: { type: String, required: false },
  // liveView: { type: String, required: false },
  // viewfinderType: { type: String, required: false },
  // viewfinderCoverage: { type: String, required: false },
  // builtinflash: { type: String, required: false },
  // flashRange: { type: String, required: false },
  // externalFlash: { type: String, required: false },
  // flashXSyncSpeed: { type: String, required: false },
  // faceDetection: { type: String, required: false },
  // redEyeDetection: { type: String, required: false },
  // digitalZoom: { type: String, required: false },
  // microphone: { type: String, required: false },
  
  // memoryType: { type: String, required: false },
  // usb: { type: String, required: false },
  // hdmiPort: { type: String, required: false },
  // wirelessTechnology: { type: String, required: false },
  // remoteControl: { type: String, required: false },
  // battery: { type: String, required: false },
  // bodyDimension: { type: String, required: false },
  // weight: { type: String, required: false },
  // specialty: { type: String, required: false },
  // compatibleLenses: { type: String, required: false },
  // productRange: { type: String, required: false },
  // warranty: { type: String, required: false },
  // releaseDate: { type: String, required: false }



});

module.exports = mongoose.model('product', productSchema, 'products');



