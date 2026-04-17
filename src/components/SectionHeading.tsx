interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeading = ({ label, title, description, center = true }: SectionHeadingProps) => (
  <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
    {label && (
      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-secondary mb-3">
        {label}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-4xl font-bold text-balance leading-tight">{title}</h2>
    {description && (
      <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
    )}
  </div>
);

export default SectionHeading;
