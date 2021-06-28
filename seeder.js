const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bootcamp = require('./models/Bootcamp');

// Load env vars.
dotenv.config({ path: './config/env.env' });

// Connect to Database.
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Load files.
const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/data/bootcamps.json`, 'utf-8')
);

// Import Data.
const importData = async () => {
  await Bootcamp.create(bootcamp);
  console.log('Data Imported...');
  process.exit(1);
};

// Delete Data.
const deleteData = async () => {
  await Bootcamp.deleteMany();
  console.log('Data Deleted...');
  process.exit(1);
};

// Run Seeder.
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
