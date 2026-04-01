import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, Loader2 } from 'lucide-react';
import { publicContactRepository } from '@/repositories/publicContactRepository';
import { useToast } from '@/components/common/ToastProvider';
import { useLanguage } from '@/state/LanguageContext';

const initialFormState = {
  name: '',
  email: '',
  mobileNo: '',
  subject: '',
  message: '',
};

export function ContactUsPage() {
  const { t } = useLanguage();
  const subjectOptions = [t('contact.form.subjectTechnical'), t('contact.form.subjectOrder'), t('contact.form.subjectBulk'), t('contact.form.subjectOther')];
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showError, showSuccess } = useToast();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await publicContactRepository.createContactInquiry(formData);
      showSuccess(response.message || t('contact.success.submitted'));
      setFormData(initialFormState);
    } catch (error) {
      const fallbackMessage = t('contact.errors.submitFailed');
      showError(error instanceof Error ? error.message : fallbackMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{t('contact.badge')}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">{t('contact.title')}</h1>
        <p className="text-text-muted text-xl max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {[
            {
              icon: <Mail className="w-5 h-5" />,
              label: t('contact.cards.email'),
              value: 'support@mobileparts.com',
              sub: t('contact.cards.emailSub'),
            },
            {
              icon: <Phone className="w-5 h-5" />,
              label: t('contact.cards.call'),
              value: '+1 (800) 123-4567',
              sub: t('contact.cards.callSub'),
            },
            {
              icon: <MapPin className="w-5 h-5" />,
              label: t('contact.cards.visit'),
              value: 'Tech Plaza 42, Berlin',
              sub: 'Germany, 10117',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 flex items-start gap-4"
            >
              <div className="p-3 bg-surface border border-border rounded-xl text-primary">{item.icon}</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{item.label}</p>
                <p className="font-bold text-lg">{item.value}</p>
                <p className="text-xs text-text-muted mt-1">{item.sub}</p>
              </div>
            </motion.div>
          ))}

          <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">{t('contact.hours.title')}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">{t('contact.hours.weekdays.label')}</span>
                <span className="font-bold">{t('contact.hours.weekdays.value')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">{t('contact.hours.saturday.label')}</span>
                <span className="font-bold">{t('contact.hours.saturday.value')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">{t('contact.hours.sunday.label')}</span>
                <span className="font-bold text-accent">{t('contact.hours.sunday.value')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12 space-y-8"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">{t('contact.form.fullName')}</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.fullNamePlaceholder')}
                  className="w-full h-12 bg-bg border border-border rounded-xl px-4 text-sm focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">{t('contact.form.email')}</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.emailPlaceholder')}
                  className="w-full h-12 bg-bg border border-border rounded-xl px-4 text-sm focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">{t('contact.form.phone')}</label>
              <input
                name="mobileNo"
                type="tel"
                required
                value={formData.mobileNo}
                onChange={handleInputChange}
                placeholder={t('contact.form.phonePlaceholder')}
                className="w-full h-12 bg-bg border border-border rounded-xl px-4 text-sm focus:border-primary outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">{t('contact.form.subject')}</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full h-12 bg-bg border border-border rounded-xl px-4 text-sm focus:border-primary outline-none transition-colors appearance-none"
              >
                <option value="">{t('contact.form.subjectPlaceholder')}</option>
                {subjectOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">{t('contact.form.message')}</label>
              <textarea
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t('contact.form.messagePlaceholder')}
                className="w-full bg-bg border border-border rounded-xl p-4 text-sm focus:border-primary outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('contact.form.sending')}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t('contact.form.send')}
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
