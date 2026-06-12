import type { ReputationScores } from '../../../types';

export const REPUTATION_LABELS: { key: keyof ReputationScores; label: string }[] = [
  { key: 'claimsExperience', label: 'Claims experience' },
  { key: 'customerService', label: 'Customer service' },
  { key: 'valueForMoney', label: 'Value for money' },
  { key: 'trustReputation', label: 'Trust & reputation' },
  { key: 'digitalExperience', label: 'Digital experience' },
];
