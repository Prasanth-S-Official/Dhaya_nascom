import { Material } from "./material.model";

describe('Material Model', () => {

  fit('Frontend_Material_model_should_create_an_instance_with_defined_properties', () => {
    // Create a sample Material object
    const material: Material = {
      materialId: 101,
      materialName: 'Cement',
      description: 'High-quality cement for construction.',
      category: 'Construction',
      pricePerUnit: 300,
      unitType: 'Bag',
      availabilityStatus: 'In Stock'
    };

    expect(material).toBeTruthy();
    expect(material.materialId).toBe(101);
    expect(material.materialName).toBe('Cement');
    expect(material.description).toBe('High-quality cement for construction.');
    expect(material.category).toBe('Construction');
    expect(material.pricePerUnit).toBe(300);
    expect(material.unitType).toBe('Bag');
    expect(material.availabilityStatus).toBe('In Stock');
  });

});
