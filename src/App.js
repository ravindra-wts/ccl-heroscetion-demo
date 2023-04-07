import React, { useRef, useMemo, useLayoutEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  Environment,
  OrbitControls,
  Plane,
  useGLTF,
  useAnimations
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import { Mesh, PlaneGeometry, MeshStandardMaterial } from "three";

import "./styles.css";

export default function App() {
  const controlsRef = useRef();

  return (
    <>
      {/* <video src="/bg15.mp4" autoPlay loop /> */}
      <video src="/bg5.mp4" autoPlay loop />
      <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
        <ambientLight intensity={0.2} />
        {/* <Environment
          // files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@annotations/public/img/workshop_1k.hdr"
          // background
          preset={"forest"}
          intensity={0}
        /> */}
        {/* <ambientLight intensity={0.8} /> */}
        <OrbitControls
          ref={controlsRef}
          autoRotate
          minPolarAngle={Math.PI / 2.9}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={6}
          maxDistance={9}
        />
        <Model controlerRef={controlsRef} />
      </Canvas>
    </>
  );
}

export function Model({ controlerRef, ...props }) {
  const texture = useLoader(TextureLoader, "/christ.png");

  const { camera, scene } = useThree();

  const group = useRef();
  const { nodes, materials } = useGLTF("/ccl.glb");
  var newId;

  const handlePointerOver = (event) => {
    event.stopPropagation();
    controlerRef.current.autoRotate = false;

    console.log("event", event, "rotation", event.object.parent.rotation);

    const newMesh = new Mesh(
      new PlaneGeometry(),
      new MeshStandardMaterial({ map: texture })
    );
    let { x, y, z } = event.object.parent.position;
    let {
      x: rotationX,
      y: rotationY,
      z: rotationZ
    } = event.object.parent.rotation;

    // position = { y: position.y + 2, position };
    console.log("group", x, y, z);
    newMesh.position.set(x, y + 1.5, z);
    newMesh.rotation.set(rotationX, rotationY, rotationZ);

    console.log("newmesh id", newMesh.id);
    newId = newMesh.id;
    // Add the new mesh to the scene
    // camera.position.set(x, y + 2, z);
    // camera.lookAt(newMesh.position);
    group.current.add(newMesh);
  };

  const handlePointerOut = () => {
    controlerRef.current.autoRotate = true;
    // console.log("newId uib", scene.getObjectById(newId, true));

    let newObj = scene.getObjectById(newId, true);
    newObj.parent.remove(newObj);
    // scene.remove();
  };
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="orbit_4"
          castShadow
          receiveShadow
          geometry={nodes.orbit_4.geometry}
          material={materials["white.003"]}
          rotation={[Math.PI, -0.58, Math.PI]}
          scale={[490.04, 0.05, 490.04]}
        />
        <mesh
          name="orbit_2"
          castShadow
          receiveShadow
          geometry={nodes.orbit_2.geometry}
          material={materials["white.001"]}
          rotation={[Math.PI, -0.35, Math.PI]}
          scale={[318.16, 0.05, 318.16]}
        />
        <mesh
          name="orbit_1"
          castShadow
          receiveShadow
          geometry={nodes.orbit_1.geometry}
          material={materials.white}
          rotation={[-Math.PI, 1.21, -Math.PI]}
          scale={[230.84, 0.05, 230.84]}
        />
        <mesh
          name="orbit_3"
          castShadow
          receiveShadow
          geometry={nodes.orbit_3.geometry}
          material={materials["white.002"]}
          rotation={[Math.PI, -0.93, Math.PI]}
          scale={[401.27, 0.05, 401.27]}
        />
        <mesh
          name="orbit_5"
          castShadow
          receiveShadow
          geometry={nodes.orbit_5.geometry}
          material={materials["white.004"]}
          rotation={[0, 0.21, 0]}
          scale={[576.38, 0.05, 576.38]}
        />
        <mesh
          name="orbit_6"
          castShadow
          receiveShadow
          geometry={nodes.orbit_6.geometry}
          material={materials["white.005"]}
          rotation={[-Math.PI, 0.18, -Math.PI]}
          scale={[665, 0.05, 665]}
        />

        <Billboard position={[0.34, 0, -2.19]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            name="Circle"
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={materials["Material.011"]}
            // position={[0.34, 0, -2.19]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />
        </Billboard>

        <Billboard position={[-2.6, 0, 1.06]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            name="Circle001"
            castShadow
            receiveShadow
            geometry={nodes.Circle001.geometry}
            material={materials["Material.004"]}
            // position={[-2.6, 0, 1.06]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />
        </Billboard>

        <Billboard position={[-2.49, 0, -2.33]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            name="Circle009"
            castShadow
            receiveShadow
            geometry={nodes.Circle009.geometry}
            material={materials["Material.009"]}
            // position={[-2.49, 0, -2.33]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />
        </Billboard>

        <Billboard position={[1.6, 0, 0.21]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            name="Circle011"
            castShadow
            receiveShadow
            geometry={nodes.Circle011.geometry}
            material={materials["Material.002"]}
            // position={[1.6, 0, 0.21]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />
        </Billboard>

        <Billboard position={[0.86, 0, -4.56]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            name="Circle012"
            castShadow
            receiveShadow
            geometry={nodes.Circle012.geometry}
            material={materials["Material.010"]}
            // position={[0.86, 0, -4.56]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />
        </Billboard>

        <Billboard position={[5.08, 0, -1.6]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            name="Circle013"
            castShadow
            receiveShadow
            geometry={nodes.Circle013.geometry}
            material={materials["Material.008"]}
            // position={[5.08, 0, -1.6]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />
        </Billboard>

        <Billboard position={[0.41, 0, 4.01]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            name="Circle014"
            castShadow
            receiveShadow
            geometry={nodes.Circle014.geometry}
            material={materials["Material.003"]}
            // position={[0.41, 0, 4.01]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />
        </Billboard>

        <mesh
          name="orbit_7"
          castShadow
          receiveShadow
          geometry={nodes.orbit_7.geometry}
          material={materials["white.006"]}
          rotation={[-Math.PI, 0.26, -Math.PI]}
          scale={[763.17, 0.05, 763.17]}
        />

        <Billboard position={[0, 0, 0]} args={[1000, 1100]}>
          <mesh
            name="Frame_1"
            castShadow
            receiveShadow
            geometry={nodes.Frame_1.geometry}
            material={materials["Frame 1"]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={4.78}
          />
        </Billboard>
      </group>
    </group>
  );
}

useGLTF.preload("/ccl.glb");

{
  /* <Billboard position={[0, 0, 0]} args={[1000, 1100]}>
<mesh
  name="cc_logo"
  castShadow
  receiveShadow
  geometry={nodes.cc_logo.geometry}
  material={materials.cc_gradient_01}
  rotation={[Math.PI / 2, 0, 0]}
  scale={2.69}
/>
</Billboard> */
}
