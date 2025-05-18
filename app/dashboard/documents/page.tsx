'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, FileText, AlertCircle, Upload } from 'lucide-react';
import { useUserType } from '@/lib/contexts/user-type-context';

export default function DocumentsPage() {
  const { userType } = useUserType();
  
  // Mock data - in production this would come from an API
  const documentStatus = [
    { 
      id: 1, 
      name: 'Visa Application', 
      status: 'completed', 
      progress: 100,
      icon: CheckCircle2,
      href: '/dashboard/documents/1',
      description: 'Tourist visa application completed and approved'
    },
    { 
      id: 2, 
      name: 'Residence Permit', 
      status: 'in-progress', 
      progress: 60,
      icon: Clock,
      href: '/dashboard/documents/2',
      description: 'Iqama application in progress'
    },
    { 
      id: 3, 
      name: 'Health Insurance', 
      status: 'pending', 
      progress: 30,
      icon: FileText,
      href: '/dashboard/documents/3',
      description: 'Mandatory health insurance documentation'
    },
    { 
      id: 4, 
      name: 'Bank Account', 
      status: 'attention', 
      progress: 10,
      icon: AlertCircle,
      href: '/dashboard/documents/4',
      description: 'Local bank account setup required'
    },
  ];
  
  // Status colors for progress bars
  const statusColors = {
    'completed': 'bg-success text-white',
    'in-progress': 'bg-primary text-white',
    'pending': 'bg-amber-500 text-white',
    'attention': 'bg-destructive text-white',
  };

  // Progress bar colors
  const progressColors = {
    'completed': 'bg-success',
    'in-progress': 'bg-primary',
    'pending': 'bg-amber-500',
    'attention': 'bg-destructive',
  };

  // Helper function to ensure progress value is valid
  const getValidProgress = (progress: number) => {
    return Math.min(Math.max(progress, 0), 100);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Manage and track your important documents
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Documents</CardTitle>
            <CardDescription>All your documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">2 require attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Review</CardTitle>
            <CardDescription>Documents awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Updated 2 hours ago</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed</CardTitle>
            <CardDescription>Approved documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">Ready for download</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Status</CardTitle>
          <CardDescription>Track your application progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {documentStatus.map(doc => (
              <div key={doc.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${statusColors[doc.status as keyof typeof statusColors]}`}>
                      <doc.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={doc.href}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${progressColors[doc.status as keyof typeof progressColors]}`}
                    style={{ width: `${getValidProgress(doc.progress)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{getValidProgress(doc.progress)}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* User type specific document requirements */}
      {userType === 'tourist' && (
        <Card>
          <CardHeader>
            <CardTitle>Tourist Visa Requirements</CardTitle>
            <CardDescription>Essential documents for your visit</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-success mr-2" />
                <span>Valid passport with at least 6 months validity</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-success mr-2" />
                <span>Completed visa application form</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span>Travel insurance (pending)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
      
      {userType === 'investor' && (
        <Card>
          <CardHeader>
            <CardTitle>Investment Documentation</CardTitle>
            <CardDescription>Required business documents</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-success mr-2" />
                <span>Business registration certificate</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span>Investment license application</span>
              </li>
              <li className="flex items-center">
                <AlertCircle className="h-5 w-5 text-destructive mr-2" />
                <span>Financial statements</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
      
      {userType === 'expat' && (
        <Card>
          <CardHeader>
            <CardTitle>Residency Requirements</CardTitle>
            <CardDescription>Documents for long-term stay</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-success mr-2" />
                <span>Employment contract</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span>Iqama application</span>
              </li>
              <li className="flex items-center">
                <AlertCircle className="h-5 w-5 text-destructive mr-2" />
                <span>Educational certificates attestation</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}