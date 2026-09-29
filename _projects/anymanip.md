---
layout: page
title: AnyManip
description: Predicting task-relevant motion, then turning it into robot actions.
importance: 1
category: robot-learning
---

<div class="anymanip-study">
  <header class="anymanip-intro">
    <p class="anymanip-kicker">BIGAI · Robot Learning · Optical Flow</p>
    <p class="anymanip-deck">
      AnyManip treats motion as the bridge between visual understanding and robot control. A diffusion model first predicts task-relevant optical flow; a robot policy then combines that prediction with RGB observations and proprioception to produce actions.
    </p>
    <a
      class="anymanip-action"
      href="https://docs.google.com/presentation/d/19nUYHw8X3sdLhDyd7jTqibmMLVAhmP2ckVoNxw-0xtU/edit?slide=id.g32db6ab4331_0_0#slide=id.g32db6ab4331_0_0"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="fa-brands fa-google-drive" aria-hidden="true"></i>
      Experiment Slides
    </a>
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
        The policy closes the loop. It conditions on the current scene, predicted object and end-effector motion, and the robot state, then replans actions as the manipulation progresses.
      </p>
    </div>
    <div class="anymanip-demo-grid anymanip-policy-grid">
      <figure>
        <img
          src="{{ '/assets/img/projects/anymanip/policy-carrot.jpg' | relative_url }}"
          alt="Integrated AnyManip rollout for placing a carrot on a plate"
          loading="lazy"
        >
        <figcaption>
          <strong>Carrot Placement</strong>
          Scene grounding, object motion, and gripper motion in one rollout.
        </figcaption>
      </figure>
      <figure>
        <img
          src="{{ '/assets/img/projects/anymanip/policy-stack.jpg' | relative_url }}"
          alt="Integrated AnyManip rollout for stacking colored blocks"
          loading="lazy"
        >
        <figcaption>
          <strong>Block Stacking</strong>
          The same representation supports a contact-rich compositional task.
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="anymanip-section anymanip-summary">
    <div class="anymanip-section-heading">
      <span>03 · Perspective</span>
      <h2>Why Flow?</h2>
    </div>
    <p>
      Optical flow provides a robot-agnostic description of how a task should evolve. By separating motion prediction from action generation, AnyManip can learn from heterogeneous visual data while leaving embodiment-specific control to the policy.
    </p>
    <a
      class="anymanip-text-link"
      href="https://docs.google.com/presentation/d/19nUYHw8X3sdLhDyd7jTqibmMLVAhmP2ckVoNxw-0xtU/edit?slide=id.g32db6ab4331_0_0#slide=id.g32db6ab4331_0_0"
      target="_blank"
      rel="noopener noreferrer"
    >
      View The Full Experiment Deck
      <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
    </a>
  </section>

  <p class="anymanip-credit">
    This project was conducted at the Beijing Institute for General Artificial Intelligence with Dr. Siyuan Huang and Dr. Tengyu Liu.
  </p>
</div>
