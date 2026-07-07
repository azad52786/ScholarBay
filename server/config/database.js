const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(async () => {
        console.log("DB Connected Successfully");
        // Drop obsolete index from renamed schema field
        try {
            const collections = await mongoose.connection.db.listCollections({ name: "certificates" }).toArray();
            if (collections.length > 0) {
                await mongoose.connection.db.collection("certificates").dropIndex("uniqueCertificateId_1");
                console.log("Obsolete index 'uniqueCertificateId_1' dropped successfully.");
            }
        } catch (e) {
            // Index might not exist or already dropped, which is fine
        }
    })
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};