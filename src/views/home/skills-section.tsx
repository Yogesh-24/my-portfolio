import { skillGroups } from "@/data/mocks/home";

export const SkillsSection = () => {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mx-auto w-full max-w-6xl px-6 py-24">
      <h2 id="skills-heading" className="text-3xl font-bold text-foreground sm:text-4xl">
        Skills
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.category} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-foreground">{group.category}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-3 py-1 text-sm text-foreground/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
