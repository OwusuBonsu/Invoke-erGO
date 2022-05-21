import { useEffect, useContext } from 'react';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
  HealthInputOptions,
} from 'react-native-health';
import { HealthkitDataContext } from './context/HealthkitDataContext';

export default function handleGetData(getHealthKitData) {

  const permissions = {
    permissions: {
      read: [
        // //Characteristics(done)
        AppleHealthKit.Constants.Permissions.Height, //getLatestHeight
        AppleHealthKit.Constants.Permissions.Weight, //getLatestWeight
        AppleHealthKit.Constants.Permissions.BiologicalSex, //getBiologicalSex
        //AppleHealthKit.Constants.Permissions.BloodType, //getBloodType
        //AppleHealthKit.Constants.Permissions.WaistCircumference, //getLatestWaistCircumference
        AppleHealthKit.Constants.Permissions.DateOfBirth,
        // Body Measurements (done)
        //AppleHealthKit.Constants.Permissions.BodyMass, //can we delete this for weight instead of this
        //AppleHealthKit.Constants.Permissions.BodyFatPercentage, //getLatestBodyFatPercentage
        //AppleHealthKit.Constants.Permissions.BodyMassIndex, //(zafe said to scrap this)
        //AppleHealthKit.Constants.Permissions.LeanBodyMass, //getLatestLeanBodyMass
        // Hearing (done)
        //AppleHealthKit.Constants.Permissions.EnvironmentalAudioExposure, //getEnvironmentalAudioExposure
        //AppleHealthKit.Constants.Permissions.HeadphoneAudioExposure, //getHeadphoneAudioExposure
        //AppleHealthKit.Constants.Permissions.EnvironmentalAudioExposureEvent, //getEnvironmentalAudioExposureEvent invoke addition
        ///AppleHealthKit.Constants.Permissions.HeadphoneAudioExposureEvent, //invoke addition

        //Fitness (done)
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.StepCount,
        //AppleHealthKit.Constants.Permissions.DistanceWalkingRunning, //getDistanceWalkingRunning
        //AppleHealthKit.Constants.Permissions.DistanceSwimming, //(scrap for now and ask zafe)
        //AppleHealthKit.Constants.Permissions.DistanceCycling, //getDistanceCycling
        //AppleHealthKit.Constants.Permissions.FlightsClimbed, //getFlightsClimbed
        //AppleHealthKit.Constants.Permissions.NikeFuel, //should we even use this(ask zafe)

        //Activity (done)
        //AppleHealthKit.Constants.Permissions.ActiveEnergyBurned, //getActiveEnergyBurned
        //AppleHealthKit.Constants.Permissions.BasalEnergyBurned, //getBasalEnergyBurned
        //AppleHealthKit.Constants.Permissions.AppleExerciseTime, //getAppleExerciseTime
        //AppleHealthKit.Constants.Permissions.AppleStandTime, //getAppleStandTime

        //Vitals
        AppleHealthKit.Constants.Permissions.HeartRate, //(should we use this or heatbeat samples or heart rate variability instead)
        //AppleHealthKit.Constants.Permissions.WalkingHeartRateAverage, //getWalkingHeartRateAverage
        //AppleHealthKit.Constants.Permissions.RestingHeartRate, //getRestingHeartRateSamples
        AppleHealthKit.Constants.Permissions.HeartRateVariability, //getHeartRateVariabilitySamples
        //AppleHealthKit.Constants.Permissions.HeartbeatSeries, //(ask zafe before doing this)
        AppleHealthKit.Constants.Permissions.Vo2Max, //getVo2MaxSamples
        //AppleHealthKit.Constants.Permissions.BodyTemperature, //(ask zafe about user input data)
        //AppleHealthKit.Constants.Permissions.BloodPressureDiastolic, //gonna scrap because we need to snag correlated
        //AppleHealthKit.Constants.Permissions.BloodPressureSystolic, //correlate both
        AppleHealthKit.Constants.Permissions.RespiratoryRate, //getRespiratoryRateSamples
        //AppleHealthKit.Constants.Permissions.OxygenSaturation, //getOxygenSaturationSamples
        //AppleHealthKit.Constants.Permissions.Electrocardiogram, //getElectrocardiogramSamples
        // sleep & Mindfulness
        //AppleHealthKit.Constants.Permissions.SleepAnalysis, //getSleepSamples
        //AppleHealthKit.Constants.Permissions.MindfulSession, //getMindfulSession
        // workouts
        //AppleHealthKit.Constants.Permissions.Workout, //saveWorkout

        // Lab and test results
        //AppleHealthKit.Constants.Permissions.BloodAlcoholContent, //getBloodAlcoholContentSamples

        //Reproductive Health (Consult Zafe)
        //Symptoms Identifiers (consult Zafe)

        //New Invoke stuff---------
        //vitals
        //vitals.h
        //vitals.m(doublecheck again)

        //hearing

        //lab tests
        //AppleHealthKit.Constants.Permissions.NumberOfTimesFallen,

        //mobility/vitals
        //AppleHealthKit.Constants.Permissions.LowCardioFitnessEvent, //.t
        //AppleHealthKit.Constants.Permissions.LowHeartRateEvent, //.t
        //AppleHealthKit.Constants.Permissions.HighHeartRateEvent, //.t
        //AppleHealthKit.Constants.Permissions.IrregularHeartRateEvent, //.t
        AppleHealthKit.Constants.Permissions.AppleWalkingSteadiness, //(Working)
        //AppleHealthKit.Constants.Permissions.AppleWalkingSteadinessEvent, //.t
        AppleHealthKit.Constants.Permissions.SixMinuteWalkTestDistance, //.t
        //AppleHealthKit.Constants.Permissions.WalkingSpeed, //.t
        //AppleHealthKit.Constants.Permissions.WalkingStepLength, //.t
        AppleHealthKit.Constants.Permissions.WalkingAsymmetryPercentage, //.t
        AppleHealthKit.Constants.Permissions.WalkingDoubleSupportPercentage, //.t
        //AppleHealthKit.Constants.Permissions.StairAscentSpeed, //.t
        //AppleHealthKit.Constants.Permissions.StairDescentSpeed, //.t
        //---------
      ],
      write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  } as HealthKitPermissions;

  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */

    if (error) {
      console.log('[ERROR] Cannot grant permissions!');
    }

    /* Can now read or write to HealthKit */

    let options = {
      startDate: new Date(2020,0,0).toISOString(), //change to todays date minus 7 days
      endDate: new Date().toISOString(), //change to todays date minus 7 days
    
    };

    //-----------Data Retrieval--------------// ask Owusu how we can condense this to 1 function for cleanliness
    //Body Methods 1
    AppleHealthKit.getLatestWeight(
      //add in all of the functions to be able to get this data
      options,
      (err: Object, results: HealthValue) => {
        if (err || results == null) {
          return;
        } else {
          getHealthKitData(healthKitData => [...healthKitData, results])
        }
      },
    );

    AppleHealthKit.getLatestHeight(
      //add in all of the functions to be able to get this data
      options,
      (err: Object, results: HealthValue) => {
        if (err || results == null) {
          return;
        } else {
          getHealthKitData(healthKitData => [...healthKitData, results])
        }
      },
    );

    //Characteristic 1
    AppleHealthKit.getBiologicalSex(
      //add in all of the functions to be able to get this data
      options,
      (err: Object, results: HealthValue) => {
        if (err || results == null) {
          return;
        } else {
          getHealthKitData(healthKitData => [...healthKitData, results])
        }
      },
    );
    AppleHealthKit.getDateOfBirth(
      //add in all of the functions to be able to get this data
      options,
      (err: Object, results: HealthValue) => {
        if (err || results == null) {
          return;
        } else {
          getHealthKitData(healthKitData => [...healthKitData, results])
        }
      },
    );

    //Fitness 1
    // AppleHealthKit.getDailyStepSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getDailyDistanceWalkingRunningSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getDailyFlightsClimbedSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );

    //Activity 1
    // AppleHealthKit.getActiveEnergyBurned(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getBasalEnergyBurned(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getAppleExerciseTime(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getAppleStandTime(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getActivitySummary(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    //Hearing 1
    // AppleHealthKit.getEnvironmentalAudioExposure(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getEnvironmentalAudioExposureEvent(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getHeadphoneAudioExposure(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getHeadphoneAudioExposureEvent(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );

    //Lab Tests 1
    // AppleHealthKit.getNumberOfTimesFallen(
    //   //invoke addition
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );

    //Sleep 1
    // AppleHealthKit.getSleepSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );

    //Vitals 1
    // AppleHealthKit.getHeartRateSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getRestingHeartRate(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getRestingHeartRateSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getWalkingHeartRateAverage(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getRespiratoryRateSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    AppleHealthKit.getHeartRateVariabilitySamples(
      //add in all of the functions to be able to get this data
      options,
      (err: Object, results: HealthValue) => {
        if (err || results == null) {
          return;
        } else {
          getHealthKitData(healthKitData => [...healthKitData, results])
        }
      },
    );
    // AppleHealthKit.getHeartbeatSeriesSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getVo2MaxSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getOxygenSaturationSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getElectrocardiogramSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getBodyTemperatureSamples(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getBloodPressureSamples( //add in all of the functions to be able to get this data
    //   (options),
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return
    //     }
    //     getHealthKitData(healthKitData => [...healthKitData, results])

    //     console.log(results)
    //   },
    // );
    // AppleHealthKit.getLowCardioFitnessEvent(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getLowHeartRateEvent(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getHighHeartRateEvent(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getIrregularHeartRateEvent(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );

    //Mobility 1
    AppleHealthKit.getAppleWalkingSteadiness(
      //add in all of the functions to be able to get this data
      options,
      (err: Object, results: HealthValue) => {
        if (err || results == null) {
          return;
        } else {
          getHealthKitData(healthKitData => [...healthKitData, results])
        }
      },
    );
    // AppleHealthKit.getAppleWalkingSteadinessEvent(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getSixMinuteWalkTestDistance(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getWalkingSpeed(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getWalkingStepLength(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getWalkingAsymmetryPercentage(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getWalkingDoubleSupportPercentage(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getStairAscentSpeed(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    // AppleHealthKit.getStairDescentSpeed(
    //   //add in all of the functions to be able to get this data
    //   options,
    //   (err: Object, results: HealthValue) => {
    //     if (err || results == null) {
    //       return;
    //     } else {
    //       getHealthKitData(healthKitData => [...healthKitData, results])
    //     }
    //   },
    // );
    //Workout
    // leave for zafe to create

    //reproductive data
  });
}