import React from 'react';
import VCardBuilderForm from './form';

interface Props {
  userPlan?: any;
  userRole?: string;
  planFeatures?: any;
  userName?: string;
  userEmail?: string;
}

export default function VCardBuilderCreate({ userPlan, userRole, planFeatures, userName, userEmail }: Props) {
  return <VCardBuilderForm userPlan={userPlan} userRole={userRole} planFeatures={planFeatures} userName={userName} userEmail={userEmail} />;
}