import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/co
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Database, CheckCircle, XCircle, Eye, EyeSlash } from '@phosphor-icons/react'
import { toast } from 'sonner'
export function SupabaseConfig() {
  const [supabaseKey, setSupabaseKey] = u


  const keyValue = supabaseKey || ''
  useEffect(() => {
      testConnection()
  }, [])
  const testConnection = async () => {

    try {
      


      toast.success('Conexión e
      setConnected(fal
    }
    }

    if (!urlValue || !keyValue) {
      return

    setSupabaseKey((
    toast
    setTimeout(() => {
    },


    <di

            <Database si
          <h1 className="text-3xl font-bold">Configu
            Conecta t
        </div>
        <Card>
            <Ca
              Obtén est
     
   

                placeholder="https://tu
                onChange={(e) => 
            </div>
            
     

                  placeholder="eyJ
                  onChange={(e) =>
    
                  type="button"
    
                  onCl
                  {showKey ? <
            


                  <CheckCircle size={18} we

          
                </AlertDescription>
            )}
            <div className="flex gap-2">
                onClick={saveCredentials} 
                className="flex-1"
                
              <Button 
                variant="outline"
              >
              
          </Ca

          <Car
          </CardHeader
            <div className="space-y-2 text-sm">
              <p className="t
              </p>
              <p className="fo
                Las pol

              <p className="text-muted-
              </p>
          </CardCont

          <Alert>
              💡 <strong>Tip:</s
                supabase.com
            </Al
        )}

}




























































































