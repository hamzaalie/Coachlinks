import React, { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import { PageWrapper } from '@/components/PageWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { businessTypeOptions } from '@/pages/vcard-builder/business-templates';
import { Search, Sparkles, Crown, ArrowRight, Check } from 'lucide-react';
import { PlanSubscriptionModal } from '@/components/plan-subscription-modal';
import { toast } from '@/components/custom-toast';

interface Props {
  hasActivePlan: boolean;
  currentPlan?: any;
  paymentMethods?: any[];
  plans?: any[];
}

export default function TemplateGallery({ hasActivePlan, currentPlan, paymentMethods = [], plans = [] }: Props) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Filter to only show coach templates
  const coachTemplates = useMemo(() => {
    return businessTypeOptions.filter((option) => option.value.endsWith('-coach'));
  }, []);

  // Filter templates based on search
  const filteredTemplates = useMemo(() => {
    if (!searchTerm) return coachTemplates;
    const search = searchTerm.toLowerCase();
    return coachTemplates.filter(
      (template) =>
        template.label.toLowerCase().includes(search) ||
        template.value.toLowerCase().includes(search)
    );
  }, [coachTemplates, searchTerm]);

  const handleTemplateClick = async (templateValue: string) => {
    setSelectedTemplate(templateValue);

    if (hasActivePlan) {
      // User has a plan, go directly to create page with template
      router.get(route('vcard-builder.create'), { template: templateValue });
    } else {
      // User doesn't have a plan, store template and show subscription modal or redirect to pricing
      if (plans.length > 0 && paymentMethods.length > 0) {
        // Show subscription modal with the first recommended plan
        const recommendedPlan = plans.find((p: any) => p.recommended) || plans[0];
        setSelectedPlan(recommendedPlan);
        setIsSubscriptionModalOpen(true);
      } else {
        // Redirect to pricing page
        router.post(route('onboarding.template-selection.store'), {
          template: templateValue,
        });
      }
    }
  };

  const handleSubscriptionModalClose = () => {
    setIsSubscriptionModalOpen(false);
    setSelectedPlan(null);
  };

  const breadcrumbs = [
    { title: t('Dashboard'), href: route('dashboard') },
    { title: t('Coach Card Builder'), href: route('vcard-builder.index') },
    { title: t('Choose Template') },
  ];

  return (
    <PageWrapper
      title={t('Choose Your Coach Card Template')}
      url={route('vcard-builder.templates')}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              {t('Choose Your Template')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {hasActivePlan
                ? t('Select a template to start building your Coach Card')
                : t('Select a template, then subscribe to a plan to get started')}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('Search templates...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Info Banner for users without plan */}
        {!hasActivePlan && (
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 flex items-center gap-4">
            <div className="p-2 bg-primary/20 rounded-full">
              <Crown className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{t('Subscribe to Get Started')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('Choose a template below, then subscribe to create your professional Coach Card')}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.get(route('plans.index'))}>
              {t('View Plans')}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTemplates.map((template, index) => {
            const isSelected = selectedTemplate === template.value;

            return (
              <Card
                key={template.value}
                className={`group cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/50 ${
                  isSelected ? 'ring-2 ring-primary border-primary shadow-lg' : ''
                }`}
                onClick={() => handleTemplateClick(template.value)}
              >
                <CardContent className="p-4">
                  {/* Template Preview Header */}
                  <div
                    className={`aspect-[4/3] rounded-lg mb-3 flex items-center justify-center relative overflow-hidden ${
                      isSelected ? 'bg-primary/10' : 'bg-muted'
                    }`}
                  >
                    {/* Decorative gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                    
                    {/* Template icon */}
                    <span className="text-5xl relative z-10">{template.icon}</span>

                    {/* Selection check */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}

                    {/* Theme number badge */}
                    <Badge
                      variant="secondary"
                      className="absolute bottom-2 left-2 text-xs"
                    >
                      {t('Theme')} #{template.themeNumber || index + 1}
                    </Badge>
                  </div>

                  {/* Template Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {template.label}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {t('Professional template')}
                      </span>
                      <ArrowRight
                        className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                          isSelected ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">{t('No templates found')}</h3>
            <p className="text-muted-foreground">
              {t('Try adjusting your search term')}
            </p>
          </div>
        )}
      </div>

      {/* Subscription Modal */}
      {selectedPlan && (
        <PlanSubscriptionModal
          plan={selectedPlan}
          billingCycle="monthly"
          isOpen={isSubscriptionModalOpen}
          onClose={handleSubscriptionModalClose}
          paymentMethods={paymentMethods}
          selectedTemplate={selectedTemplate}
        />
      )}
    </PageWrapper>
  );
}
