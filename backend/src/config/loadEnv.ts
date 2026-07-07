import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'node:url';

const backendDir = path.dirname(fileURLToPath(import.meta.url));
const rootEnv = path.resolve(backendDir, '../../.env');
const localEnv = path.resolve(backendDir, '../.env');

dotenv.config({ path: rootEnv });
dotenv.config({ path: localEnv });
