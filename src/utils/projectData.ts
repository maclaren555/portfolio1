// 1. Динамический импорт ВСЕХ изображений
const allProjectImages = import.meta.glob<string>('/src/assets/images/**/*.png', { 
  eager: true, 
  query: '?url', 
  import: 'default' 
});

// 2. Группируем изображения по проектам
const projectsData: { [key: string]: string[] } = {};
for (const path in allProjectImages) {
    const parts = path.split('/');
    const projectName = parts[4];
    if (!projectsData[projectName]) {
        projectsData[projectName] = [];
    }
    projectsData[projectName].push(allProjectImages[path] as string);
}

// 3. Словарь с кастомными категориями
const projectCategories: { [key: string]: string } = {
    'neokartel': 'Branding & Identity',
    'shinobicraft': 'E-commerce Platform',
    'sacartella': 'AI & Blockchain',
    // Добавьте другие проекты по аналогии
};

// 4. Формируем финальный массив проектов
export const projects = Object.keys(projectsData).map((name, index) => ({
    id: index + 1,
    name: name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    category: projectCategories[name.toLowerCase()] || 'Web Development', // Используем словарь
    imageUrl: projectsData[name].find(img => img.endsWith('1.png')) || projectsData[name][0],
    allImages: projectsData[name].sort(), // Сортируем, чтобы изображения были в порядке
})); 