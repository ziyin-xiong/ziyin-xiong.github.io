---
layout: page
title: AnyManip
description: Predicting task-relevant motion, then turning it into robot actions.
importance: 1
category: robot-learning
---

<div class="anymanip-study">
  <header class="anymanip-intro">
    <p class="anymanip-kicker">BIGAI · Manipulation · Imitation Learning · Optical Flow</p>
    <p class="anymanip-deck">
      AnyManip treats motion as the bridge between visual understanding and robot control. A diffusion model first predicts task-relevant optical flow; a robot policy then combines that prediction with RGB observations and proprioception to produce actions.
    </p>
  </header>

  <div class="anymanip-pipeline" aria-label="AnyManip two-stage pipeline">
    <div>
      <span>Stage 01</span>
      <strong>Predict Motion</strong>
      <small>Image + Language → Optical Flow</small>
    </div>
    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    <div>
      <span>Stage 02</span>
      <strong>Execute The Skill</strong>
      <small>RGB + Flow + State → Robot Actions</small>
    </div>
  </div>

  <section class="anymanip-section">
    <div class="anymanip-section-heading">
      <span>01 · Optical Flow Prediction</span>
      <h2>Task-Conditioned Motion</h2>
      <p>
        The flow model focuses on motion that matters for the instruction: where the gripper should move, which object should be manipulated, and how the interaction should unfold over time.
      </p>
      <p>
        Training targets come from optical flow estimated in robot and human manipulation videos, including BridgeData V2, DROID, and RH20T. From an initial scene and a language instruction, the model predicts future dense motion for both the end effector and the object.
      </p>
    </div>
    <div class="anymanip-demo-grid anymanip-flow-grid">
      <figure>
        <div class="anymanip-demo-label"><span>01</span>Stacking</div>
        <img
          src="{{ '/assets/img/projects/anymanip/flow-stack.jpg' | relative_url }}"
          alt="Predicted optical flow for stacking a green block on a yellow block"
          loading="lazy"
        >
        <figcaption>Stack the green block on the yellow block.</figcaption>
      </figure>
      <figure>
        <div class="anymanip-demo-label"><span>02</span>Placement</div>
        <img
          src="{{ '/assets/img/projects/anymanip/flow-carrot.jpg' | relative_url }}"
          alt="Predicted optical flow for placing a carrot on a plate"
          loading="lazy"
        >
        <figcaption>Put the carrot on the plate.</figcaption>
      </figure>
    </div>
  </section>

  <section class="anymanip-section">
    <div class="anymanip-section-heading">
      <span>02 · Robot Policy</span>
      <h2>From Pixels To Actions</h2>
      <p>
        The action model combines the current RGB observation, predicted motion, and robot state. It predicts a sequence of Cartesian position, orientation, and gripper commands; the examples below show the scene and motion cues for two simulated tasks.
      </p>
    </div>
    <div class="anymanip-demo-grid anymanip-policy-grid">
      <figure>
        <img
          src="{{ '/assets/img/projects/anymanip/policy-carrot.jpg' | relative_url }}"
          alt="Carrot placement scene alongside object and gripper motion representations"
          loading="lazy"
        >
        <figcaption>
          <strong>Carrot Placement Setup</strong>
          RGB scene, interaction regions, and predicted motion for placing a carrot on a plate.
        </figcaption>
      </figure>
      <figure>
        <img
          src="{{ '/assets/img/projects/anymanip/policy-stack.jpg' | relative_url }}"
          alt="Block stacking scene alongside object and gripper motion representations"
          loading="lazy"
        >
        <figcaption>
          <strong>Block Stacking Setup</strong>
          The same scene and motion representation applied to a compositional task.
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="anymanip-section">
    <div class="anymanip-section-heading">
      <span>03 · Offline Action Evaluation</span>
      <h2>Predicted Actions Across Tasks</h2>
      <p>
        Later experiments compare policy predictions with demonstrated actions across seven channels: x, y, z, yaw, pitch, roll, and grasp. Each result pairs sampled episode frames with the predicted and reference action traces.
      </p>
    </div>
    <div class="anymanip-demo-grid anymanip-result-grid">
      <figure>
        <a href="{{ '/assets/img/projects/anymanip/action-cloth-basket.webp' | relative_url }}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size yellow cloth action comparison" title="Open full-size result">
          <img
            src="{{ '/assets/img/projects/anymanip/action-cloth-basket.webp' | relative_url }}"
            alt="Yellow cloth episode frames above predicted and demonstrated Cartesian, orientation, and grasp action traces"
            loading="lazy"
          >
        </a>
        <figcaption>
          <strong>Yellow Cloth Into A Basket</strong>
          Offline action comparison for placing a cloth into a basket. Blue: prediction; orange: demonstration.
        </figcaption>
      </figure>
      <figure>
        <a href="{{ '/assets/img/projects/anymanip/action-mushroom-pot.webp' | relative_url }}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size mushroom action comparison" title="Open full-size result">
          <img
            src="{{ '/assets/img/projects/anymanip/action-mushroom-pot.webp' | relative_url }}"
            alt="Mushroom placement episode frames above predicted and demonstrated Cartesian, orientation, and grasp action traces"
            loading="lazy"
          >
        </a>
        <figcaption>
          <strong>Mushroom Into A Pot</strong>
          A second instruction and object configuration, evaluated with the same seven action channels.
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="anymanip-section anymanip-summary">
    <div class="anymanip-section-heading">
      <span>04 · Perspective</span>
      <h2>Why Flow?</h2>
    </div>
    <p>
      Optical flow provides a robot-agnostic description of how a task should evolve. By separating motion prediction from action generation, AnyManip can learn from heterogeneous visual data while leaving embodiment-specific control to the policy.
    </p>
  </section>

  <p class="anymanip-credit">
    This project was conducted at the Beijing Institute for General Artificial Intelligence with Peiyuan Zhi and Yang Yang, advised by Dr. Tengyu Liu and Dr. Siyuan Huang.
  </p>
</div>
