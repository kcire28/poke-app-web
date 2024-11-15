import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
export const SpinnerPage= ({
  text = 'Cargando',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        alignContent: 'center',
        backgroundColor: '#f0f2f5',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
         <Loader2 className="animate-spin" />
        <Label>{text}</Label>
      </div>
    </div>
  )
}
