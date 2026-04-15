import React, { useMemo, useState } from 'react';
import { router } from '@inertiajs/react';
import { PageTemplate } from '@/components/page-template';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { businessTypeOptions } from '@/pages/vcard-builder/business-templates';

interface Props {
  selectedTemplate?: string;
  selectedPlanId?: number | null;
}

export default function TemplateSelection({ selectedTemplate = 'business-coach', selectedPlanId = null }: Props) {
  const { t } = useTranslation();
  const coachTemplates = useMemo(
    () => businessTypeOptions.filter((option) => option.value.endsWith('-coach')),
    []
  );

  const [template, setTemplate] = useState<string>(selectedTemplate);

  const continueToPlans = () => {
    router.post(route('onboarding.template-selection.store'), {
      template,
      plan_id: selectedPlanId,
    });
  };

  return (
    <PageTemplate
      title={t('Choose Your Template')}
      description={t('Step 2 of onboarding: pick a coach template before payment.')}
      url="/onboarding/template-selection"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('Pick your coach template')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('After this, you will go to plan payment. Once payment is completed, you will be redirected to the editor with this template selected.')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coachTemplates.map((option) => {
            const isSelected = option.value === template;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTemplate(option.value)}
                className={`text-left rounded-xl border p-4 transition ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border hover:border-primary/40 hover:bg-muted/30'
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className="font-semibold">{option.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{t('Theme')} #{option.themeNumber}</div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <Button onClick={continueToPlans}>{t('Continue to Payment')}</Button>
        </div>
      </div>
    </PageTemplate>
  );
}
