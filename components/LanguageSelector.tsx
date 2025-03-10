'use client';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const languages = ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'Ruby'];

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded bg-background "
    >
      <option value="">Select Language</option>
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}   