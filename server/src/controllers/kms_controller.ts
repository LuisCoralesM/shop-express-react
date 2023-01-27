import { KeyManagementServiceClient } from "@google-cloud/kms";
import { Request, Response } from "express";
import { Storage } from "@google-cloud/storage";
import axios from "axios";

const projectId = "inlaid-vehicle-374802";
const locationId = "global";
const keyRingId = "secure_development";
const keyId = "llave_proyecto";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// async function authenticateImplicitWithAdc() {
//   try {
//     const storage = new Storage({
//       projectId,
//     });
//     const [buckets] = await storage.getBuckets();
//     console.log("Buckets:");

//     for (const bucket of buckets) {
//       console.log(`- ${bucket.name}`);
//     }

//     console.log("Listed all storage buckets.");
//   } catch (e) {
//     console.log(e);
//   }
// }

// authenticateImplicitWithAdc();

// Instantiates a client
const client = new KeyManagementServiceClient();

// Build the key name
const keyName = client.cryptoKeyPath(projectId, locationId, keyRingId, keyId);

export async function decryptData(req: Request, res: Response) {
  try {
    const decryptedText = await decryptSymmetric();

    return res.status(200).json({ decryptedText });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

async function decryptSymmetric() {
  try {
    const a = await axios.get(
      "http://localhost:5017/api/SecureDevelopment/get-encrypted-data"
    );

    const [decryptResponse] = await client.decrypt({
      name: keyName,
      ciphertext: a.data,
    });

    const plaintext = decryptResponse.plaintext?.toString();

    console.log(`Plaintext: ${plaintext}`);
    return plaintext;
  } catch (e) {
    console.log(e);
  }
}
