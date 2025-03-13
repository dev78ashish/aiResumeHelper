export const cleanResumeText = (text) => {
    let cleaned = text.replace(/\n{3,}/g, '\n\n');

    const sections = ['experience', 'education', 'skills', 'projects', 'certifications', 'contact'];
    sections.forEach(section => {
        const regex = new RegExp(`(^|\\n)(${section}|${section.toUpperCase()}):?`, 'i');
        cleaned = cleaned.replace(regex, `\n\n## ${section.toUpperCase()} ##\n`);
    });

    return cleaned;
};

export const getScoreColor = (score) => {
    if (score >= 80) return { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-400' };
    if (score >= 60) return { bg: 'bg-amber-100', text: 'text-amber-700', ring: 'ring-amber-400' };
    return { bg: 'bg-red-100', text: 'text-red-700', ring: 'ring-red-400' };
};

export const removeAsterisks = (text) => {
    return text.replace(/\*/g, "");
};


export const removeAsterisksFromArray = (arr) => {
    return arr.map(item => typeof item === "string" ? item.replace(/\*/g, "").trim() : item).filter(item => item !== "");
}


export const cleanObject = (arr) => {
    if (!Array.isArray(arr)) {
        console.error("Expected an array but received:", typeof arr, arr);
        return [];
    }

    return arr
        .map(({ title, description }) => ({
            title: title.replace(/\*/g, "").trim(),
            description: description.replace(/\*/g, "").trim(),
        }))
        .filter(({ title, description }) => title !== "" || description !== ""); // Remove empty objects
};


export const parseAllDetails = (detailsText) => {
    if (!detailsText) return {};

    const details = {};
    const lines = detailsText.split('\n').filter(line => line.trim());

    lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim().toLowerCase().replace(/\s+/g, '_');
            const value = parts.slice(1).join(':').trim();
            details[key] = value !== "Not specified" ? value : "";
        }
    });

    return details;
};
