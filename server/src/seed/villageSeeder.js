import chalk from "chalk";
import mongoose from "mongoose";
import Village from "../models/village.model.js"; // adjust path if needed

// 🌾 1. Define seed data
const villages = [
  {village_name_mr: "संगमनेर शहर", village_name_en: "sangamner city"},
  { village_name_mr: "अकलापूर", village_name_en: "Akalapur" },
{ village_name_mr: "अजमपुर", village_name_en: "Ajamapur" },
{ village_name_mr: "अंभोरे", village_name_en: "Ambhore" },
{ village_name_mr: "आभळावाडी", village_name_en: "Abhalawadi" },
{ village_name_mr: "आरामपूर", village_name_en: "Aramapur" },
{ village_name_mr: "आश्वी खुर्द", village_name_en: "Ashvi Khurd" },
{ village_name_mr: "आश्वी बुद्रुक", village_name_en: "Ashvi Budruk" },
{ village_name_mr: "आंबी खालसा", village_name_en: "Ambikhalasa" },
{ village_name_mr: "आंबी दुमाला", village_name_en: "Ambi Dumala" },
{ village_name_mr: "उंबरी", village_name_en: "Umbari" },
{ village_name_mr: "ओझर खुर्द", village_name_en: "Ojhar Khurd" },
{ village_name_mr: "ओझर बुद्रुक", village_name_en: "Ojhar Budruk" },
{ village_name_mr: "औरंगपूर", village_name_en: "Aurangapur" },
{ village_name_mr: "कणसेवाडी", village_name_en: "Kanasewadi" },
{ village_name_mr: "कनकापुर", village_name_en: "Kanakapur" },
{ village_name_mr: "कनोली", village_name_en: "Kanoli" },
{ village_name_mr: "करुले", village_name_en: "Karule" },
{ village_name_mr: "कर्जुले पठार", village_name_en: "Karjule Pathar" },
{ village_name_mr: "कऱ्हे", village_name_en: "Karhe" },
{ village_name_mr: "काकडवाडी", village_name_en: "Kakadawadi" },
{ village_name_mr: "कासारा दुमाला", village_name_en: "Kasara Dumala" },
{ village_name_mr: "कसारे", village_name_en: "Kasare" },
{ village_name_mr: "कुरकुटवाडी", village_name_en: "Kurakutawadi" },
{ village_name_mr: "कुरकुंडी", village_name_en: "Kurakundi" },
{ village_name_mr: "कुरण", village_name_en: "Kuran" },
{ village_name_mr: "कुंभारवाडी", village_name_en: "Kumbharawadi" },
{ village_name_mr: "केळेवाडी", village_name_en: "Kelewadi" },
{ village_name_mr: "कोकणगाव", village_name_en: "Kokanagaon" },
{ village_name_mr: "कोकणेवाडी", village_name_en: "Kokanewadi" },
{ village_name_mr: "कोल्हेवाडी", village_name_en: "Kolhewadi" },
{ village_name_mr: "कोळवाडे", village_name_en: "Kolavade" },
{ village_name_mr: "कोंची", village_name_en: "Konchi" },
{ village_name_mr: "कौठे कमलेश्वर", village_name_en: "Kauthe Kamaleshvar" },
{ village_name_mr: "कौठे खुर्द", village_name_en: "Kauthe Khurd" },
{ village_name_mr: "कौठे धांदरफळ", village_name_en: "Kauthe Dhandaraphal" },
{ village_name_mr: "कौठे बुद्रुक", village_name_en: "Kauthe Budruk" },
{ village_name_mr: "कौठे मलकापूर", village_name_en: "Kauthe Malakapur" },
{ village_name_mr: "कौठेवाडी", village_name_en: "Kauthewadi" },
{ village_name_mr: "खरशिंदे", village_name_en: "Kharashinde" },
{ village_name_mr: "खराडी", village_name_en: "Kharadi" },
{ village_name_mr: "खळी", village_name_en: "Khali" },
{ village_name_mr: "खांजापुर", village_name_en: "Khanjapur" },
{ village_name_mr: "खांडगांव", village_name_en: "Khandagaon" },
{ village_name_mr: "खांडगेदरा", village_name_en: "Khandagedara" },
{ village_name_mr: "खांबे", village_name_en: "Khambe" },
{ village_name_mr: "खंदरमाळवाडी", village_name_en: "Khandaramalawadi" },
{ village_name_mr: "आनंदवाडी", village_name_en: "Gabhanawadi" },
{ village_name_mr: "गुंजाळवाडी", village_name_en: "Gunjalawadi" },
{ village_name_mr: "गुंजाळवाडी पठार", village_name_en: "Gunjalawadi Pathar" },
{ village_name_mr: "गोडसेवाडी", village_name_en: "Godasewadi" },
{ village_name_mr: "घारगाव", village_name_en: "Gharagaon" },
{ village_name_mr: "घुलेवाडी", village_name_en: "Ghulewadi" },
{ village_name_mr: "चणेगाव", village_name_en: "Chanegaon" },
{ village_name_mr: "चिकणी", village_name_en: "Chikani" },
{ village_name_mr: "चिखली", village_name_en: "Chikhali" },
{ village_name_mr: "चिंचपुर खुर्द", village_name_en: "Chinchapur Khurd" },
{ village_name_mr: "चिंचपुर बु", village_name_en: "Chinchapur Budruk" },
{ village_name_mr: "चिंचोली गुरव", village_name_en: "Chincholi Gurav" },
{ village_name_mr: "चंदनापुरी", village_name_en: "Chandanapuri" },
{ village_name_mr: "जवळेकडलग", village_name_en: "Javalekadalag" },
{ village_name_mr: "जवळे बाळेश्वर", village_name_en: "Javale Baleshvar" },
{ village_name_mr: "जाखुरी", village_name_en: "Jakhuri" },
{ village_name_mr: "जांबुत खुर्द", village_name_en: "Jambut Khurd" },
{ village_name_mr: "जांबुत बुद्रुक", village_name_en: "Jambut Budruk" },
{ village_name_mr: "जुणेगांव", village_name_en: "Junegaon" },
{ village_name_mr: "जोर्वे", village_name_en: "Jorve" },
{ village_name_mr: "झरेकाठी", village_name_en: "Jharekathi" },
{ village_name_mr: "झोळे", village_name_en: "Jhole" },
{ village_name_mr: "डिग्रस", village_name_en: "Digras" },
{ village_name_mr: "डोळासणे", village_name_en: "Dolasane" },
{ village_name_mr: "ढोलेवाडी", village_name_en: "Dholewadi" },
{ village_name_mr: "तळेगाव", village_name_en: "Talegaon" },
{ village_name_mr: "तिगाव", village_name_en: "Tigaon" },
{ village_name_mr: "दरेवाडी", village_name_en: "Darewadi" },
{ village_name_mr: "दाढ खुर्द", village_name_en: "Dadh Khurd" },
{ village_name_mr: "देवकौठे", village_name_en: "Devakauthe" },
{ village_name_mr: "देवगाव", village_name_en: "Devagaon" },
{ village_name_mr: "धांदरफळ खुर्द", village_name_en: "Dhandaraphal Khurd" },
{ village_name_mr: "धांदरफळ बु", village_name_en: "Dhandaraphal Budruk" },
{ village_name_mr: "धुपे", village_name_en: "Dhupe" },
{ village_name_mr: "नान्नज दुमाला", village_name_en: "Nannaj Dumala" },
{ village_name_mr: "नांदुर खंदरमाळ", village_name_en: "Nandur Khandaramal" },
{ village_name_mr: "नांदुरी दुमाला", village_name_en: "Nanduri Dumala" },
{ village_name_mr: "निमगाव खुर्द", village_name_en: "Nimagaon Khurd" },
{ village_name_mr: "निमगावजाळी", village_name_en: "Nimagaonajali" },
{ village_name_mr: "निमगाव टेंभी", village_name_en: "Nimagaon Tembhi" },
{ village_name_mr: "निमगाव बुद्रुक", village_name_en: "Nimagaon Budruk" },
{ village_name_mr: "निमगाव भोजापूर", village_name_en: "Nimagaon Bhojapur" },
{ village_name_mr: "निमज", village_name_en: "Nimaj" },
{ village_name_mr: "निमोण", village_name_en: "Nimon" },
{ village_name_mr: "निळवंडे", village_name_en: "Nilavande" },
{ village_name_mr: "निंबाळे", village_name_en: "Nimbale" },
{ village_name_mr: "पळसखेडे", village_name_en: "Palasakhede" },
{ village_name_mr: "पानोडी", village_name_en: "Panodi" },
{ village_name_mr: "पारेगाव खुर्द", village_name_en: "Paregaon Khurd" },
{ village_name_mr: "पारेगाव बुद्रुक", village_name_en: "Paregaon Budruk" },
{ village_name_mr: "पिंपारणे", village_name_en: "Pimparane" },
{ village_name_mr: "पिंपळगाव कोंझिरा", village_name_en: "Pimpalagaon Konjhira" },
{ village_name_mr: "पिंपळगाव देपा", village_name_en: "Pimpalagaon Depa" },
{ village_name_mr: "पिंपळगाव माथा", village_name_en: "Pimpalagaon Matha" },
{ village_name_mr: "पिंपळे", village_name_en: "Pimpale" },
{ village_name_mr: "पिंप्री लौकी अजमपुर", village_name_en: "Pimpri Lauki Ajamapur" },
{ village_name_mr: "पेमागिरी", village_name_en: "Pemagiri" },
{ village_name_mr: "पेमरेवाडी", village_name_en: "Pemarewadi" },
{ village_name_mr: "पोखरी बाळेश्वर", village_name_en: "Pokhari Baleshvar" },
{ village_name_mr: "पोखरी हवेली", village_name_en: "Pokhari Haveli" },
{ village_name_mr: "प्रतापपूर", village_name_en: "Pratapapur" },
{ village_name_mr: "बाळापूर", village_name_en: "Balapur" },
{ village_name_mr: "बांबळेवाडी", village_name_en: "Bambalewadi" },
{ village_name_mr: "बिरेवाडी", village_name_en: "Birewadi" },
{ village_name_mr: "बोटा", village_name_en: "Bota" },
{ village_name_mr: "बोरबनवाडी", village_name_en: "Borabanawadi" },
{ village_name_mr: "भोजदरी", village_name_en: "Bhojadari" },
{ village_name_mr: "मनोली", village_name_en: "Manoli" },
{ village_name_mr: "महालवाडी", village_name_en: "Mahalawadi" },
{ village_name_mr: "मालदाड", village_name_en: "Maladad" },
{ village_name_mr: "मालुंजे", village_name_en: "Malunje" },
{ village_name_mr: "माळवाडी", village_name_en: "Malawadi" },
{ village_name_mr: "मालेगाव पठार", village_name_en: "Malegaon Pathar" },
{ village_name_mr: "माळेगांव हवेली", village_name_en: "Malegaon Haveli" },
{ village_name_mr: "मांची", village_name_en: "Manchi" },
{ village_name_mr: "मांडवे बुद्रुक", village_name_en: "Mandave Budruk" },
{ village_name_mr: "मिर्झापूर", village_name_en: "Mirjhapur" },
{ village_name_mr: "मिरपुर", village_name_en: "Mirapur" },
{ village_name_mr: "मेंगाळवाडी", village_name_en: "Megalawadi" },
{ village_name_mr: "मेंढवण", village_name_en: "Mendhavan" },
{ village_name_mr: "मंगळापूर", village_name_en: "Mangalapur" },
{ village_name_mr: "म्हसावंडी", village_name_en: "Mhasavandi" },
{ village_name_mr: "येळखोपावाडी", village_name_en: "Yelakhopawadi" },
{ village_name_mr: "रणखांबवाडी", village_name_en: "Ranakhambawadi" },
{ village_name_mr: "रहिमपुर", village_name_en: "Rahimapur" },
{ village_name_mr: "राजापूर", village_name_en: "Rajapur" },
{ village_name_mr: "रायते", village_name_en: "Rayate" },
{ village_name_mr: "रायतेवाडी", village_name_en: "Rayatewadi" },
{ village_name_mr: "लोहारे", village_name_en: "Lohare" },
{ village_name_mr: "वडगांवपान", village_name_en: "Vadagaonapan" },
{ village_name_mr: "वडगांवलांडगा", village_name_en: "Vadagaon Landaga" },
{ village_name_mr: "वडझरी खुर्द", village_name_en: "Vadajhari Khurd" },
{ village_name_mr: "वडझरी बुद्रुक", village_name_en: "Vadajhari Budruk" },
{ village_name_mr: "वनकुटे", village_name_en: "Vanakute" },
{ village_name_mr: "वरवंडी", village_name_en: "Varavandi" },
{ village_name_mr: "वरुडी पठार", village_name_en: "Varudi Pathar" },
{ village_name_mr: "वाघापूर", village_name_en: "Vaghapur" },
{ village_name_mr: "वेल्हाळे", village_name_en: "Velhale" },
{ village_name_mr: "यशवंतनगर", village_name_en: "Vaiduwadi" },
{ village_name_mr: "शिबलापुर", village_name_en: "Shibalapur" },
{ village_name_mr: "शिरसगांव", village_name_en: "Shirasagaon" },
{ village_name_mr: "शिरापूर", village_name_en: "Shirapur" },
{ village_name_mr: "शिवापूर", village_name_en: "Shivapur" },
{ village_name_mr: "शिंदोडी", village_name_en: "Shindodi" },
{ village_name_mr: "शेडगाव", village_name_en: "Shedagaon" },
{ village_name_mr: "शेळकेवाडी", village_name_en: "Shelakewadi" },
{ village_name_mr: "शेंडेवाडी", village_name_en: "Shendewadi" },
{ village_name_mr: "समनापुर", village_name_en: "Samanapur" },
{ village_name_mr: "साकुर", village_name_en: "Sakur" },
{ village_name_mr: "सादतपुर", village_name_en: "Sadatapur" },
{ village_name_mr: "सायखिंडी", village_name_en: "Sayakhindi" },
{ village_name_mr: "सारोळे पठार", village_name_en: "Sarole Pathar" },
{ village_name_mr: "सावरगांवघुले", village_name_en: "Savaragaon Ghule" },
{ village_name_mr: "सावरगांवतळ", village_name_en: "Savaragaon Tal" },
{ village_name_mr: "सावरचोळ", village_name_en: "Savarachol" },
{ village_name_mr: "सांगवी", village_name_en: "Sangaoni" },
{ village_name_mr: "सुकेवाडी", village_name_en: "Sukewadi" },
{ village_name_mr: "सोनेवाडी", village_name_en: "Sonewadi" },
{ village_name_mr: "सोनोशी", village_name_en: "Sonoshi" },
{ village_name_mr: "हसनाबाद", village_name_en: "Hasanabad" },
{ village_name_mr: "हिवरगाव पठार", village_name_en: "Hivaragaon Pathar" },
{ village_name_mr: "हिवरगाव पावसा", village_name_en: "Hivaragaon Pavasa"},
{ village_name_mr: "हंगेवाडीा", village_name_en: "Hangewadi"}
];

// 🆔 2. Generate deterministic ObjectIds
const baseObjectId = BigInt("0x6734c7f10000000000000001");
const addObjectIds = (data) =>
  data.map((village, index) => ({
    _id: new mongoose.Types.ObjectId(
      (baseObjectId + BigInt(index)).toString(16).padStart(24, "0")
    ),
    ...village,
  }));

export const seedVillages = async () => {
  const villagesWithIds = addObjectIds(villages);
  let addedCount = 0;
  let skippedCount = 0;

  console.log(
    chalk.yellow(
      `🌱 Starting village seeder for ${villagesWithIds.length} entries...`
    )
  );

  for (const village of villagesWithIds) {
    try {
      // Check for existing village by English name
      const existing = await Village.findOne({
        village_name_en: village.village_name_en,
      });

      if (existing) {
        skippedCount++;
        console.log(
          chalk.gray(`⚪ Skipped existing: ${village.village_name_en}`)
        );
        continue;
      }

      // Validate and save
      const newVillage = new Village(village);
      await newVillage.validate();
      await newVillage.save();

      addedCount++;
      console.log(chalk.green(`✅ Added: ${village.village_name_en}`));
    } catch (validationError) {
      if (validationError.name === "ValidationError") {
        console.error(
          chalk.red(`⚠️ Validation failed for ${village.village_name_en}:`)
        );
        Object.values(validationError.errors).forEach((err) =>
          console.error(chalk.red(`  → ${err.message}`))
        );
      } else if (validationError.code === 11000) {
        console.error(
          chalk.red(`🔑 Duplicate key: ${village.village_name_en}`)
        );
      } else {
        console.error(
          chalk.red(
            `❌ Error inserting ${village.village_name_en}: ${validationError.message}`
          )
        );
      }
    }
  }

  console.log(chalk.greenBright(`\n✅ Added ${addedCount} new villages.`));
  console.log(
    chalk.blueBright(`ℹ️ Skipped ${skippedCount} existing villages.\n`)
  );

  return { addedCount, skippedCount };
};
