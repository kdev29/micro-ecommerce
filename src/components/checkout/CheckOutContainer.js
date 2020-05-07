import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Prompt } from 'react-router-dom'
import PropTypes from 'prop-types';
import SelectPaymentMethod from './SelectPaymentMethod';
import PaymentMethodDetails from './PaymentMethodDetails';
import DeliveryMethod from './DeliveryMethod';
import PlaceOrder from './PlaceOrder';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const stepsObject = {
    'Select payment method': 0,
    'Payment method details': 1,
    'Delivery method': 2,
    'Place order': 3,
}

function getSteps() {
  return Object.keys(stepsObject);
}

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return <SelectPaymentMethod {...props}></SelectPaymentMethod>
    case 1:
      return <PaymentMethodDetails {...props}></PaymentMethodDetails>
    case 2:
      return <DeliveryMethod {...props}></DeliveryMethod>;
    case 3:
      return <PlaceOrder {...props}></PlaceOrder>;
    default:
      return 'Unknown step';
  }
}

export default function CheckOutContainer() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [canLeave, setcanLeave] = useState(false);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

    const [forwardProps, setForwardProps] = useState({
        onMethodSelected: handlePaymentMethodChange,
        paymentMethod: {},
        onDeliveryMethodSelected: handleDeliveryMethodChange,
        deliveryMethod: {},
        onSelectDeliveryLocation: handleSelectDeliveryLocation,
        deliveryLocation: {}
    });


  function handleSelectDeliveryLocation(value) {
    
    setActiveStep(stepsObject['Place order']);
    setcanLeave(true);
    setForwardProps(previous => {
      return {
        ...previous,
        deliveryLocation: value
      }
    });


  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(stepsObject['Select payment method']);
  };

  function handlePaymentMethodChange(event, method) {
    setActiveStep(stepsObject['Payment method details']);
    setForwardProps((previous) => ({
        ...previous,
        paymentMethod: method
    }))
  }

 

  function handleDeliveryMethodChange(event, deliveryMethod) {
    setForwardProps((previous) => ({
        ...previous,
        deliveryMethod
    }))

    setActiveStep(stepsObject['Delivery method']);
  }

  return (
    <div className={classes.root}>
      <Prompt when={!canLeave} message="You haven't completed the checkout process, are you sure you want to leave?"></Prompt>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            
            {getStepContent(activeStep, forwardProps)}
            <div>
              {
                activeStep != 3 && (<Button  variant="contained"
                color="primary"
                
                className={classes.button} disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>     )
              }
                      

             
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
