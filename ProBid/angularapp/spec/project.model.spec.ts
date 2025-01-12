import { Project } from "./project.model";

describe('Project Model', () => {

  fit('Frontend_Project_model_should_create_an_instance_with_defined_properties', () => {
    // Create a sample Project object
    const project: Project = {
      projectId: 201,
      title: 'Website Redesign',
      description: 'Redesign the corporate website with a modern and responsive layout.',
      budget: 5000,
      deadline: new Date(2024-12-31),
      status: 'Open',
      category: 'Web Development',
      skillsRequired: 'HTML, CSS, JavaScript',
      attachments: 'https://example.com/specifications.pdf',
      priority: 'High',
      paymentTerms: 'Milestone-based',
      userId: 1
    };

    expect(project).toBeTruthy();
    expect(project.projectId).toBe(201);
    expect(project.title).toBe('Website Redesign');
    expect(project.description).toBe('Redesign the corporate website with a modern and responsive layout.');
    expect(project.budget).toBe(5000);
    expect(project.deadline).toEqual(new Date(2024-12-31));
    expect(project.status).toBe('Open');
    expect(project.category).toBe('Web Development');
    expect(project.skillsRequired).toBe('HTML, CSS, JavaScript');
    expect(project.attachments).toBe('https://example.com/specifications.pdf');
    expect(project.priority).toBe('High');
    expect(project.paymentTerms).toBe('Milestone-based');
    expect(project.userId).toBe(1);
  });
});
