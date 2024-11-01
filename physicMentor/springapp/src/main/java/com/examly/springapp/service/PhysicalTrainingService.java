import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.PhysicalTraining;

public interface PhysicalTrainingService {
    PhysicalTraining addPhysicalTraining(PhysicalTraining training);
    Optional<PhysicalTraining> getPhysicalTrainingById(Long trainingId);
    List<PhysicalTraining> getAllPhysicalTrainings();
    PhysicalTraining updatePhysicalTraining(Long trainingId, PhysicalTraining updatedTraining);
    PhysicalTraining deletePhysicalTraining(Long trainingId);
}