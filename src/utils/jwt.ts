import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_super_secreto_aqui";

export interface TokenPayload {
  id: string;
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h",
  });
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
