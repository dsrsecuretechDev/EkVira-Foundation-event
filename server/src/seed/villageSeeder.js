import chalk from "chalk";
import mongoose from "mongoose";
import Village from "../models/village.model.js"; // adjust path if needed

// 🌾 1. Define seed data
const villages = [
  { village_name_mr: "संगमनेर शहर", village_name_en: "sangamner city" },
  { village_name_mr: "अकोले", village_name_en: "Akole" },
  { village_name_mr: "राजूर", village_name_en: "Rajur" },
  { village_name_mr: "कोतुल", village_name_en: "Kotul" },
  { village_name_mr: "पाटण", village_name_en: "Pathan" },
  { village_name_mr: "गोजे", village_name_en: "Goje" },
  { village_name_mr: "दौलताबाद", village_name_en: "Daulatabad" },
  { village_name_mr: "नाशिक", village_name_en: "Nashik" },
  { village_name_mr: "शेवगाव", village_name_en: "Shevgaon" },
  { village_name_mr: "राहुरी", village_name_en: "Rahuri" },
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
