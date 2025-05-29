"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pause, Play, RotateCcw } from "lucide-react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export function ThreeDimensionalView() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls
    cubes: THREE.Mesh[]
    animationId: number | null
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x111827)

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 15

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Create grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222)
    scene.add(gridHelper)

    // Create cubes representing IoT devices
    const cubes: THREE.Mesh[] = []
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

    const createCube = (x: number, y: number, z: number, color: number) => {
      const cubeMaterial = new THREE.MeshPhongMaterial({
        color,
        shininess: 100,
        transparent: true,
        opacity: 0.9,
      })
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.position.set(x, y, z)
      scene.add(cube)
      cubes.push(cube)
      return cube
    }

    // Create several cubes with different colors
    createCube(-5, 0, 0, 0x3b82f6) // Blue
    createCube(-2.5, 1, 2, 0x10b981) // Green
    createCube(0, -1, -2, 0xf59e0b) // Yellow
    createCube(2.5, 0, 1, 0xef4444) // Red
    createCube(5, 1, -1, 0xa855f7) // Purple

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Animation function
    let animationId: number | null = null
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate cubes
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1)
        cube.rotation.y += 0.01 * (index % 3 === 0 ? 1 : -1)
      })

      controls.update()
      renderer.render(scene, camera)
    }

    // Start animation
    animate()

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      cubes,
      animationId,
    }

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return

      const { camera, renderer } = sceneRef.current

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()

      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

      if (animationId) {
        cancelAnimationFrame(animationId)
      }

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  const toggleAnimation = () => {
    if (!sceneRef.current) return

    if (isPlaying) {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
        sceneRef.current.animationId = null
      }
    } else {
      const animate = () => {
        if (!sceneRef.current) return

        sceneRef.current.animationId = requestAnimationFrame(animate)

        // Rotate cubes
        sceneRef.current.cubes.forEach((cube, index) => {
          cube.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1)
          cube.rotation.y += 0.01 * (index % 3 === 0 ? 1 : -1)
        })

        sceneRef.current.controls.update()
        sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera)
      }

      animate()
    }

    setIsPlaying(!isPlaying)
  }

  const resetView = () => {
    if (!sceneRef.current) return

    const { camera, controls, renderer, scene } = sceneRef.current

    camera.position.set(0, 0, 15)
    camera.lookAt(0, 0, 0)
    controls.reset()

    renderer.render(scene, camera)
  }

  return (
    <Card className="h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">3D Device Visualization</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={toggleAnimation}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={resetView}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={containerRef} className="w-full h-[350px]" />
      </CardContent>
    </Card>
  )
}

