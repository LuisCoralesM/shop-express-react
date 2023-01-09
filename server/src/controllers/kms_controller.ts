import { Request, Response } from "express";
import {
  KmsKeyringNode,
  buildClient,
  CommitmentPolicy,
} from "@aws-crypto/client-node";
import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  apiVersion: "latest",
  credentials: {
    accessKeyId: "AKIAS2IYA4SRBNETZ2C6",
    secretAccessKey: "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",
  },
});

const { encrypt, decrypt } = buildClient(
  CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
);

const generatorKeyId =
  "arn:aws:kms:us-east-1:193860789410:alias/trendycloth_encryptDecrypt";
const keyIds = [
  "arn:aws:kms:us-east-1:193860789410:key/47712e0d-7be2-4e96-b4e0-fd4ef6dba5d7",
];

const keyring = new KmsKeyringNode({ generatorKeyId, keyIds });

const context = {
  stage: "demo",
  purpose: "simple demonstration app",
  origin: "us-east-1",
};

export async function encryptData(req: Request, res: Response) {
  try {
    const { result } = await encrypt(keyring, req.body.data, {
      encryptionContext: context,
    });
    console.log(result.toString());

    const { plaintext } = await decrypt(keyring, result);

    return res.status(200).json({ result, text: plaintext.toString() });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function decryptData(req: Request, res: Response) {
  try {
    const { plaintext, messageHeader } = await decrypt(keyring, req.body.data);
    const { encryptionContext } = messageHeader;

    Object.entries(context).forEach(([key, value]) => {
      if (encryptionContext[key] !== value)
        throw new Error("Encryption Context does not match expected values");
    });

    return res.status(200).json({ plaintext, messageHeader });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
